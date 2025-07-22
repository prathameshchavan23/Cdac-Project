import React, { useSelector, useNavigate, useDispatch } from "react";
import { logout } from "../redux/authSlice";
const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-blue-50">
      <div className="w-64 p-5 bg-white text-gray-800 shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-10 text-blue-800">
          Student Portal
        </h2>
        <nav className="flex-grow">
          <Link
            to="/student/dashboard"
            className="block py-2.5 px-4 rounded hover:bg-blue-100"
          >
            Dashboard
          </Link>
          <Link
            to="/student/attendance"
            className="block py-2.5 px-4 rounded hover:bg-blue-100"
          >
            Attendance
          </Link>
        </nav>
        <div>
          <p className="text-sm">Welcome, {currentUser?.name}</p>
          <button
            onClick={handleLogout}
            className="w-full mt-2 py-2.5 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};
export default  Notification;
