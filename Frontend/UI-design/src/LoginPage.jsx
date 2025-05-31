import React from "react";
import artImage from "./assets/Art.png";
const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 font-inter">
      ={" "}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-white shadow-md">
        <div className="mb-6 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgBZkyEpAWT2oY_WVk_esYhh7UN8DZfCagaw&s"
            alt="CDAC ACTS Logo"
            className="h-20   rounded-full  mx-auto"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h1>
        <form className="space-y-5 w-full flex flex-col items-center">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Example@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full md:w-1/2 bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-8 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
      <div className="w-full md:w-1/2 hidden md:flex items-center justify-center">
        <img
          src={artImage}
          alt="ACTS turns 30"
          className="h-[95vh] rounded-2xl object-contain shadow-lg"
        />
      </div>
    </div>
  );
};

export default LoginPage;
