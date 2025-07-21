import React from "react";

const Dashboard = () => {
  // Mock data based on the provided image
  const stats = [
    { label: "Total Students", value: "250" },
    { label: "Active Courses", value: "12" },
    { label: "Pending Approvals", value: "3" },
  ];

  const schedule = [
    { time: "9:00 AM", course: "Math 101", activity: "Lecture on Algebra" },
    { time: "11:00 AM", course: "Science 202", activity: "Lab Session" },
    {
      time: "1:00 PM",
      course: "History 301",
      activity: "Discussion on World War II",
    },
  ];

  const activity = [
    {
      date: "2023-09-15",
      user: "Sarah Lee",
      action: "Submitted assignment for Math 101",
    },
    {
      date: "2023-09-14",
      user: "David Chen",
      action: "Completed quiz in Science 202",
    },
    {
      date: "2023-09-13",
      user: "Emily White",
      action: "Enrolled in History 301",
    },
  ];

  const tasks = [
    "Review student submissions for Math 101",
    "Grade quizzes for Science 202",
    "Prepare lecture materials for History 301",
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back, Ms. Johnson</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Schedule */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Upcoming Schedule
        </h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2">Time</th>
              <th className="py-2">Course</th>
              <th className="py-2">Activity</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 text-gray-600">{item.time}</td>
                <td className="py-3 text-gray-800 font-medium">
                  {item.course}
                </td>
                <td className="py-3 text-blue-500">{item.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent System Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent System Activity
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2">Date</th>
                <th className="py-2">User</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 text-gray-600">{item.date}</td>
                  <td className="py-3 text-gray-800 font-medium">
                    {item.user}
                  </td>
                  <td className="py-3 text-gray-600">{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Important Tasks */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Important Tasks
          </h2>
          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-3"
                />
                <span className="text-gray-700">{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
