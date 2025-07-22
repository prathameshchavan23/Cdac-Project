import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
// The logo path is assumed to be in src/assets/. Please adjust if your folder structure is different.
import cdac_logo from "../assets/cdac_logo.png";

// --- Data for Navigation Links ---
// This data defines the links that will appear for each role.

const adminLinks = [
  { name: "Dashboard", path: "/admin/dashboard", icon: "dashboard" },
  { name: "Registration", path: "/admin/registration", icon: "app_registration" },
  { name: "Attendance", path: "/admin/attendance", icon: "checklist_rtl" },
  { name: "TimeTable", path: "/admin/timetable", icon: "calendar_today" },
  {
    name: "Feedback",
    icon: "feedback",
    submenu: [
      { name: "Form", path: "/admin/feedback" },
      { name: "Dashboard", path: "/admin/feedback/dashboard" },
      { name: "Reports", path: "/admin/feedback/reports" },
    ],
  },
];

const userLinks = [
  { name: "Dashboard", path: "/user/dashboard", icon: "dashboard" },
  { name: "Profile", path: "/user/profile", icon: "person" },
  { name: "Attendance", path: "/user/attendance", icon: "checklist_rtl" },
  { name: "TimeTable", path: "/user/timetable", icon: "calendar_today" },
  // Simplified to a direct link for better user experience
  { name: "Feedback", path: "/user/feedback", icon: "feedback" },
];


const Sidebar = ({ role }) => {
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({});

  const links = role === "admin" ? adminLinks : userLinks;

  // Effect to open the relevant submenu on page load or when the route changes
  useEffect(() => {
    const activeSubmenu = links.find(item => 
      item.submenu?.some(sub => location.pathname.startsWith(sub.path))
    );
    if (activeSubmenu) {
      setOpenSubmenus(prev => ({ ...prev, [activeSubmenu.name]: true }));
    }
  }, [location.pathname, links]);


  // Handles the open/close state for each submenu individually
  const handleSubmenuToggle = (name) => {
    setOpenSubmenus((prev) => ({
      ...prev, // Keep the state of other submenus
      [name]: !prev[name],
    }));
  };

  // --- Styling Classes for Links ---
  const navLinkClass = (isActive) =>
    `flex items-center px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-700 transition-all duration-300 ${
      isActive ? "bg-indigo-600 text-white font-semibold shadow-lg border-l-4 border-indigo-300" : "font-medium"
    }`;

  const subNavLinkClass = (isActive) =>
    `flex items-center pl-12 pr-4 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-700/50 transition-all duration-300 ${
      isActive ? "bg-slate-700 font-semibold text-white" : ""
    }`;

  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen flex flex-col shadow-xl">
      {/* Logo and Title Section */}
      <div className="p-6 border-b border-slate-700 flex flex-col items-center">
        <img src={cdac_logo} alt="CDAC Logo" className="w-24 mb-3" />
        <h1 className="text-xl font-bold tracking-wider text-slate-100">CDAC Portal</h1>
      </div>

      {/* Navigation Links Section */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((item) =>
          item.submenu ? (
            <div key={item.name}>
              <button
                onClick={() => handleSubmenuToggle(item.name)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-700 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="material-icons">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className={`material-icons text-lg transition-transform duration-300 ${openSubmenus[item.name] ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>
              {/* Collapsible Submenu */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSubmenus[item.name] ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="mt-2 flex flex-col space-y-1">
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
              <span className="material-icons mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          )
        )}
      </nav>

      {/* Footer Section */}
      <div className="p-4 mt-auto border-t border-slate-700 text-center">
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} CDAC-ACTS</p>
      </div>
    </aside>
  );
};

export default Sidebar;
