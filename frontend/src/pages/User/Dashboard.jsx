import React, { useState, useEffect } from "react";
// Import the service functions we created
import { getStudentDashboardStats, getPendingFeedbackTasks } from "../../services/dashboardService";

const Dashboard = () => {
  // State to hold the dashboard data
  const [stats, setStats] = useState(null);
  const [pendingFeedback, setPendingFeedback] = useState([]);
  
  // State to manage loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook runs once when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch both sets of data in parallel for efficiency
        const [statsData, feedbackData] = await Promise.all([
          getStudentDashboardStats(),
          getPendingFeedbackTasks()
        ]);

        setStats(statsData);
        setPendingFeedback(feedbackData);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this runs only once

  // Display a loading message while data is being fetched
  if (loading) {
    return <div className="text-center p-12">Loading Dashboard...</div>;
  }

  // Display an error message if the API call fails
  if (error) {
    return <div className="text-center p-12 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      <p className="mt-4 text-gray-600">
        Welcome to your personalized dashboard! Here you'll find an overview of
        your academic progress, upcoming events, and important notifications.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Courses Enrolled Card - Displays live data */}
        <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-indigo-700">
            Courses Enrolled
          </h3>
          <p className="text-4xl font-bold text-indigo-900 mt-2">
            {stats ? stats.totalCourses : 0}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            You are currently enrolled in {stats ? stats.totalCourses : 0} courses.
          </p>
        </div>

        {/* Attendance Card - Displays live data */}
        <div className="bg-green-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-green-700">
            Overall Attendance
          </h3>
          <p className="text-4xl font-bold text-green-900 mt-2">
            {stats ? stats.attendancePercentage.toFixed(2) : 0}%
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Your attendance across all subjects.
          </p>
        </div>

        {/* Pending Feedback Card - Displays live data */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-yellow-700">
            Pending Feedback
          </h3>
          <p className="text-4xl font-bold text-yellow-900 mt-2">
            {pendingFeedback ? pendingFeedback.length : 0}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Don't forget to submit feedback for {pendingFeedback ? pendingFeedback.length : 0} courses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;