import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginStart, loginFailure, loginSuccess } from "../redux/authSlice.js";
import { loginUser } from "../api/auth.js"; // <-- CHANGE: Import our real login function

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);

  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "student"; 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const userData = await loginUser(username, password);

      const userIsAdmin = userData.role.includes("Admin");
      const userIsStudent = userData.role === "Student";

      if (role === 'staff' && !userIsAdmin) {
        dispatch(loginFailure(`Credentials are valid, but you are not Staff. Please use the Student portal.`));
        return;
      }
      if (role === 'student' && !userIsStudent) {
        dispatch(loginFailure(`Credentials are valid, but you are not a Student. Please use the Staff portal.`));
        return;
      }

      dispatch(loginSuccess(userData));

      if (userIsStudent) {
        navigate("/user/dashboard");
      } else if (userIsAdmin) {
        navigate("/staff/dashboard");
      }

    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700 font-medium">Demo Credentials:</p>
          <p className="text-xs text-blue-600">
            {role === "student"
              ? "Username: S2025011 / Password: pass123"
              : "Username: superadmin@example.com / Password: password123"}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              {role === 'student' ? 'PRN' : 'Email Address'}
            </label>
            <input
              id="username"
              type={role === 'student' ? 'text' : 'email'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={role === 'student' ? 'Enter your PRN' : 'you@example.com'}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Password"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-indigo-600 bg-white border-2 border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-sm text-center text-gray-600">
          <p>
            {role === "student" ? (
              <Link to="/login?role=staff" className="font-medium text-indigo-600 hover:text-indigo-500">
                Login as Staff instead
              </Link>
            ) : (
              <Link to="/login?role=student" className="font-medium text-indigo-600 hover:text-indigo-500">
                Login as Student instead
              </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
