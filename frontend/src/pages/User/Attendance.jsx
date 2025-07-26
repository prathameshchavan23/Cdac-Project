// Attendance.jsx
import React from "react";

const Attendance = () => {
  const attendanceRecords = [
    { subject: "Advanced Algorithms", classesHeld: 20, classesAttended: 18, percentage: "90%" },
    { subject: "Database Management", classesHeld: 15, classesAttended: 12, percentage: "80%" },
    { subject: "Operating Systems", classesHeld: 25, classesAttended: 24, percentage: "96%" },
    { subject: "Web Technologies", classesHeld: 18, classesAttended: 15, percentage: "83%" },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Attendance</h2>
      <p className="mt-4 text-gray-600">
        Review your attendance records for all your courses. Maintain good attendance to succeed!
      </p>
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classes Held
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classes Attended
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceRecords.map((record, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {record.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.classesHeld}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.classesAttended}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    parseFloat(record.percentage) >= 85 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {record.percentage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;