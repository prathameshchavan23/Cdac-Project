// Timetable.jsx
import React from "react";

const Timetable = () => {
  const classes = [
    { time: "09:00 AM - 10:30 AM", subject: "Advanced Algorithms", location: "Lecture Hall 1", day: "Monday" },
    { time: "11:00 AM - 12:30 PM", subject: "Database Management", location: "Classroom 3", day: "Monday" },
    { time: "02:00 PM - 03:30 PM", subject: "Operating Systems", location: "Lab 2", day: "Tuesday" },
    { time: "09:00 AM - 10:30 AM", subject: "Web Technologies", location: "Lecture Hall 2", day: "Wednesday" },
    { time: "11:00 AM - 12:30 PM", subject: "Software Engineering", location: "Classroom 5", day: "Wednesday" },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Timetable</h2>
      <p className="mt-4 text-gray-600">
        Here is your current class schedule. Stay updated with your lectures and labs.
      </p>
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Day
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {classes.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.day}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;