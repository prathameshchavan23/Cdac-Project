import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginStart, loginFailure, loginSuccess } from "../redux/authSlice.js";
import fakeAuthApi from "../api/auth.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);

  // Get role from URL, default to 'student'
  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "student"; // 'student' is the default

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const userData = await fakeAuthApi(email, password);

      // Validate that the user's actual role matches the login form's role
      if (userData.role !== role) {
        dispatch(
          loginFailure(
            `Credentials are valid, but you are not a ${role}. Please use the correct portal.`
          )
        );
        return;
      }

      dispatch(loginSuccess(userData));

      // Navigate based on role after successful login
      if (userData.role === "student") {
        navigate("/user/dashboard");
      } else if (userData.role === "staff") {
        navigate("/staff/dashboard");
      } else {
        navigate("/dashboard"); // fallback
      }
    } catch (err) {
      dispatch(loginFailure(err.toString()));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>

        {/* Demo credentials info */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700 font-medium">Demo Credentials:</p>
          <p className="text-xs text-blue-600">
            {role === "student"
              ? "Student: user@example.com / password"
              : "Staff: admin@example.com / password"}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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

          {/* Display errors */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-sm text-center text-gray-600">
          <p>
            {/* FIX: Changed role check from "user" to "student" */}
            {role === "student" ? (
              <Link
                to="/login?role=staff"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login as Staff instead
              </Link>
            ) : (
              // FIX: Changed link from "role=user" to "role=student"
              <Link
                to="/login?role=student"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
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
