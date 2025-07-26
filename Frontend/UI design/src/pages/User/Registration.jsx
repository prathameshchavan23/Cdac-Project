// Registration.jsx
import React from "react";

const Registration = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Registration</h2>
      <p className="mt-4 text-gray-600">
        This section allows you to manage your course registrations. You can
        view your current registered courses, register for new ones, or drop
        existing courses.
      </p>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Current Registrations</h3>
        <ul className="text-left text-gray-700 space-y-2 max-w-md mx-auto">
          <li className="p-3 bg-gray-50 rounded-md shadow-sm border border-gray-200 flex justify-between items-center">
            <span>Web Development Fundamentals</span> <span className="text-sm text-green-600">Active</span>
          </li>
          <li className="p-3 bg-gray-50 rounded-md shadow-sm border border-gray-200 flex justify-between items-center">
            <span>Data Science with Python</span> <span className="text-sm text-green-600">Active</span>
          </li>
          <li className="p-3 bg-gray-50 rounded-md shadow-sm border border-gray-200 flex justify-between items-center">
            <span>Cloud Computing Basics</span> <span className="text-sm text-yellow-600">Pending Approval</span>
          </li>
        </ul>
        <button className="mt-6 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Register for New Courses
        </button>
      </div>
    </div>
  );
};

export default Registration;