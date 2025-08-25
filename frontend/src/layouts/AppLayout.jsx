// AppLayout.jsx

import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

import Sidebar from "../components/Sidebar";

const AppLayout = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //local UI state for the profile dropdown.
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Navigate to login/home page after logout
  };

  // The role prop now just needs to be passed to the Sidebar
  // The 'staff' role is analogous to 'admin' in our previous Sidebar
  const sidebarRole = role === "staff" ? "admin" : "user";

  return (
    <div className="flex h-screen bg-slate-100">
      {/* left is Sidebar (given sidebarRole), right is the main area. */}
      <Sidebar role={sidebarRole} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 2. Enhanced Header with Profile Dropdown */}
        <header className="bg-white shadow-md z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="text-lg font-semibold text-slate-700">
              {role === "staff" ? "Staff Portal" : "Student Portal"}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="material-icons text-slate-600">person</span>
                <span className="text-sm font-medium text-slate-700 hidden md:block">
                  {user?.email}
                </span>
                <span className="material-icons text-slate-600">
                  {isProfileOpen ? "expand_less" : "expand_more"}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20"
                  onClick={() => setProfileOpen(false)} // Close menu on click inside
                >
                  <div className="p-2 border-b border-slate-200">
                    <p className="text-sm font-medium text-slate-800">
                      Welcome,
                    </p>
                    <p className="text-sm text-slate-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <span className="material-icons text-base">logout</span>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 3. Main Content Rendered via Outlet */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet /> {/* This renders the specific page component */}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
