import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cdac_logo from "../assets/cdac_logo.png";
import { useAuth } from "../context/AuthContext"; // Adjust path as needed

const baseAdminLinks = [
    { name: "Dashboard", path: "/staff/dashboard", icon: "dashboard" },
    { name: "Marks", path: "/staff/marks", icon: "assignment" },
    { name: "Students", path: "/staff/students", icon: "group" },
    { name: "Attendance", path: "/staff/attendance", icon: "checklist_rtl" },
    { name: "TimeTable", path: "/staff/timetable", icon: "calendar_today" },
    { name: "Instructor", path: "/staff/instructor", icon: "person" },
    { name: "Feedback", path: "/staff/feedback", icon: "feedback" },
    { name: "Module", path: "/staff/module", icon: "add" },
    { name: "Lost and Found", path: "/staff/lost-and-found", icon: "search" },
];

const userLinks = [
    { name: "Dashboard", path: "/user/dashboard", icon: "dashboard" },
    { name: "Profile", path: "/user/profile", icon: "person" },
    { name: "Marks", path: "/user/marks", icon: "grading" },
    { name: "Attendance", path: "/user/attendance", icon: "checklist_rtl" },
    { name: "TimeTable", path: "/user/timetable", icon: "calendar_today" },
    { name: "Feedback", path: "/user/feedback", icon: "feedback" },
];

const Sidebar = () => {
    const { user } = useAuth();
    const role = user?.role; 

    const links = useMemo(() => {
        if (role === 'Super Admin') {
            const feedbackIndex = baseAdminLinks.findIndex(link => link.name === 'Feedback');
            const adminLinks = [...baseAdminLinks];
            adminLinks.splice(feedbackIndex + 1, 0, { name: "Admin Details", path: "/staff/admindetails", icon: "manage_accounts" });
            return adminLinks;
        }
        // Check for the 'Admin' role
        if (role === 'Admin') {
             return baseAdminLinks;
        }
        return userLinks;
    }, [role]);

    const navLinkClass = (isActive) =>
        `flex items-center gap-4 px-6 py-4 rounded-lg transition-all duration-300 transform ${
          isActive
            ? "bg-blue-600 text-white font-bold shadow-lg scale-105"
            : "text-gray-600 font-medium hover:bg-blue-100 hover:text-blue-700 hover:scale-105"
        }`;

    return (
        <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-screen">
            <div className="p-6 flex flex-col items-center border-b border-gray-200">
                <img src={cdac_logo} alt="CDAC Logo" className="w-40 h-auto mb-3" />
                <h1 className="text-lg font-bold tracking-wider text-gray-700">CDAC-ACTS</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {links.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => navLinkClass(isActive)}
                    >
                        <span className="material-icons text-2xl">{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
