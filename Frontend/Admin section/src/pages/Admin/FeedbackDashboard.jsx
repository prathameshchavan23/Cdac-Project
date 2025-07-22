import React from "react";
import { CalendarDays } from "lucide-react"; // ✅ icon fix

const FeedbackDashboard = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-full flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
      {/* Left Column */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex justify-between items-center mb-2">
            <button className="p-1 rounded-full hover:bg-gray-100">&lt;</button>
            <h3 className="font-semibold">October 2024</h3>
            <button className="p-1 rounded-full hover:bg-gray-100">&gt;</button>
          </div>
          <div className="grid grid-cols-7 text-center text-sm text-gray-500">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d} className="py-2">
                {d}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`py-2 cursor-pointer ${
                  day === 5
                    ? "bg-blue-600 text-white rounded-full"
                    : "hover:bg-gray-100 rounded-full"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold mb-4">Upcoming Events</h3>
          <ul className="space-y-3">
            {[
              { title: "Math 101 Exam", date: "Oct 21, 2024" },
              { title: "History 202 Lecture", date: "Oct 22, 2024" },
              { title: "Physics Lab", date: "Oct 23, 2024" },
            ].map((event, i) => (
              <li key={i} className="flex items-start">
                <CalendarDays className="w-5 h-5 mr-3 mt-1 text-gray-500" />
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-2/3">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">FeedBack</h1>
          <p className="text-gray-500">October 21, 2024</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
          <div className="flex-1 p-6 bg-lime-100 border border-lime-300 rounded-lg text-center">
            <p className="text-lg text-lime-800">Total Submissions</p>
            <p className="text-5xl font-bold text-lime-900 my-2">169</p>
            <p className="text-md text-lime-800">Submitted</p>
          </div>
          <div className="flex-1 p-6 bg-red-100 border border-red-300 rounded-lg text-center">
            <p className="text-lg text-red-800">Pending</p>
            <p className="text-5xl font-bold text-red-900 my-2">46</p>
            <p className="text-md text-red-800">Remaining</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-gray-800 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-gray-900">
            Check Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
