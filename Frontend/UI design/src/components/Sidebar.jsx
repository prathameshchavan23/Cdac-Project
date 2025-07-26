import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
// The logo path is assumed to be in src/assets/. Please adjust if your folder structure is different.
import cdac_logo from "../assets/cdac_logo.png";

// --- Data for Navigation Links ---
// This data defines the links that will appear for each role.

const adminLinks = [
  { name: "Dashboard", path: "/staff/dashboard", icon: "dashboard" },
  { name: "Marks", path: "/staff/marks", icon: "assignment" },
  { name: "Students", path: "/staff/students", icon: "group" },
  { name: "Attendance", path: "/staff/attendance", icon: "checklist_rtl" },
  { name: "TimeTable", path: "/staff/timetable", icon: "calendar_today" },
  { name: "Instructor", path: "/staff/instructor", icon: "person" },
  { name: "Feedback", path: "/staff/feedback", icon: "feedback" },
  { name: "Admin Details", path: "/staff/admindetails", icon: "edit" },
  { name: "Module", path: "/staff/module", icon: "add" },
  { name: "Lost and Found", path: "/staff/lost-and-found", icon: "search" },
];

const userLinks = [
  { name: "Dashboard", path: "/user/dashboard", icon: "dashboard" },
  { name: "Profile", path: "/user/profile", icon: "person" },
  { name: "Attendance", path: "/user/attendance", icon: "checklist_rtl" },
  { name: "TimeTable", path: "/user/timetable", icon: "calendar_today" },
  {
    name: "Feedback",
    path: "/user/feedback",
    icon: "feedback",
    submenu: [
      { name: "Theory Feedback", path: "/user/feedback/theory" },
      { name: "Lab Feedback", path: "/user/feedback/lab" },
    ],
  },
];

const Sidebar = ({ role }) => {
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({});

  // Logic remains the same: choose links based on role
  const links = role === "admin" ? adminLinks : userLinks;

  // Logic remains the same: open submenu if a child route is active
  useEffect(() => {
    const activeSubmenu = links.find((item) =>
      item.submenu?.some((sub) => location.pathname.startsWith(sub.path))
    );
    if (activeSubmenu) {
      setOpenSubmenus((prev) => ({ ...prev, [activeSubmenu.name]: true }));
    }
  }, [location.pathname, links]);

  // Logic remains the same: handle submenu toggling
  const handleSubmenuToggle = (name) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // --- NEW Styling Classes for Links based on the image ---
  const navLinkClass = (isActive) =>
    `flex items-center gap-4 px-6 py-4 rounded-lg text-gray-600 hover:bg-gray-200/60 transition-all duration-300 ${
      isActive ? "text-blue-800 font-bold" : "font-medium"
    }`;

  const subNavLinkClass = (isActive) =>
    `flex items-center pl-16 pr-4 py-2 rounded-md text-sm text-gray-500 hover:bg-gray-200/60 transition-all duration-300 ${
      isActive ? "text-blue-800 font-semibold" : ""
    }`;

  return (
    // Updated main container style
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Updated Logo and Title Section */}
      <div className="p-6 flex flex-col items-center border-b border-gray-200">
        <img src={cdac_logo} alt="CDAC Logo" className="w-40 h-20 mb-3" />
        <h1 className="text-lg font-semibold tracking-wider text-gray-700">
          CDAC-ACTS
        </h1>
      </div>

      {/* Navigation Links Section - Logic is the same, classes are updated */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((item) =>
          item.submenu ? (
            <div key={item.name}>
              {/* The button now uses the same base style as the NavLink */}
              <button
                onClick={() => handleSubmenuToggle(item.name)}
                className={`flex items-center justify-between w-full text-left ${navLinkClass(
                  location.pathname.startsWith("/staff/feedback")
                )}`}
              >
                <div className="flex items-center gap-4">
                  <span className="material-icons text-2xl">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                <span
                  className={`material-icons text-lg transition-transform duration-300 ${
                    openSubmenus[item.name] ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>
              {/* Collapsible Submenu */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSubmenus[item.name] ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="mt-1 flex flex-col space-y-1">
                  {item.submenu.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      className={({ isActive }) => subNavLinkClass(isActive)}
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => navLinkClass(isActive)}
            >
              <span className="material-icons text-2xl">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
