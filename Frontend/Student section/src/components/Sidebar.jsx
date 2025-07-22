import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "./Icon";
import cdac_logo from "../assets/cdac_logo.png";

const Sidebar = () => {
  const location = useLocation();
  const [isFeedbackOpen, setFeedbackOpen] = useState(
    location.pathname.startsWith("/feedback")
  );

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <Icon path="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      ),
    },
    {
      name: "Registration",
      path: "/registration",
      icon: (
        <Icon path="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
      ),
    },
    {
      name: "Timetable",
      path: "/timetable",
      icon: (
        <Icon path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 14.25h.008v.008H12v-.008z" />
      ),
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: (
        <Icon path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      ),
    },
    {
      name: "Feedback",
      icon: (
        <Icon path="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.006 3 11.5c0 2.582 2.16 4.834 5.25 6.425.89.473 1.92.296 2.622-.434.64-.672.97-1.61.832-2.522-.128-.81-.832-1.428-1.658-1.745-1.141-.441-2.332-.23-3.23.513.92-.693 2.12-.93 3.33-.513 1.28.433 2.12.93 2.622 1.972.502 1.042.176 2.374-.832 3.23-.941.89-2.286 1.178-3.502.832-1.216-.345-2.16-1.141-2.622-2.182a9.012 9.012 0 01-1.13-3.662c0-3.415 2.733-6.188 6.188-6.188s6.188 2.773 6.188 6.188-2.773 6.188-6.188 6.188z" />
      ),
      subItems: [
        { name: "Dashboard", path: "/feedback/dashboard" },
        { name: "Reports", path: "/feedback/reports" },
      ],
    },
  ];

  const navLinkClasses = (isActive) =>
    `flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 ${
      isActive ? "bg-blue-200 text-blue-800 font-bold" : ""
    }`;

  const subNavLinkClasses = (isActive) =>
    `flex items-center space-x-3 p-2 pl-12 rounded-lg text-sm text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 ${
      isActive ? "bg-blue-100 text-blue-800 font-semibold" : ""
    }`;

  return (
    <div className="w-64 bg-gray-100 h-screen flex flex-col p-4 border-r border-gray-200">
      <div className="flex flex-col items-center text-center mb-10">
        <div className=" mb-3">
          <img
            src={cdac_logo}
            alt="CDAC Logo"
            className="w-45 h-25 mr-1 flex-shrink-0"
          />
        </div>
        <h1 className="font-bold text-gray-800">CDAC-ACTS</h1>
      </div>
      <nav className="flex flex-col space-y-1">
        {menuItems.map((item) =>
          item.subItems ? (
            <div key={item.name}>
              <button
                onClick={() => setFeedbackOpen(!isFeedbackOpen)}
                className={`w-full ${navLinkClasses(
                  isFeedbackOpen || location.pathname.startsWith("/feedback")
                )}`}
              >
                {item.icon}
                <span>{item.name}</span>
                <Icon
                  path={
                    isFeedbackOpen
                      ? "M4.5 15.75l7.5-7.5 7.5 7.5"
                      : "M8.25 15L12 18.75 15.75 15"
                  }
                  className="w-4 h-4 ml-auto"
                />
              </button>
              {isFeedbackOpen && (
                <div className="flex flex-col space-y-1 mt-1">
                  {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.name}
                      to={subItem.path}
                      className={({ isActive }) => subNavLinkClasses(isActive)}
                    >
                      <span>{subItem.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => navLinkClasses(isActive)}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
