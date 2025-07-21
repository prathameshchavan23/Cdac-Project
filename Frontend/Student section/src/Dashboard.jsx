// Dashboard.jsx
import React from "react";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      <p className="mt-4 text-gray-600">
        Welcome to your personalized dashboard! Here you'll find an overview of
        your academic progress, upcoming events, and important notifications.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-indigo-700">
            Courses Enrolled
          </h3>
          <p className="text-4xl font-bold text-indigo-900 mt-2">5</p>
          <p className="text-sm text-gray-600 mt-2">
            You are currently enrolled in 5 courses.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-green-700">
            Upcoming Assignments
          </h3>
          <p className="text-4xl font-bold text-green-900 mt-2">3</p>
          <p className="text-sm text-gray-600 mt-2">
            You have 3 assignments due in the next week.
          </p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-yellow-700">
            Pending Feedback
          </h3>
          <p className="text-4xl font-bold text-yellow-900 mt-2">2</p>
          <p className="text-sm text-gray-600 mt-2">
            Don't forget to submit feedback for 2 courses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
