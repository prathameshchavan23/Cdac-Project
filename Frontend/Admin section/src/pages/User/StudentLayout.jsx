import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const StudentLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Student Panel</h2>
        <nav className="flex flex-col space-y-3">
          <NavLink
            to="/student/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-200"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/student/attendance"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-200"
            }
          >
            Attendance
          </NavLink>
          <NavLink
            to="/student/feedback"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-200"
            }
          >
            Feedback
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
