import React from "react";

const FeedbackReports = () => {
  // Mock data
  const reports = [
    {
      id: 1,
      prof: "Prof. Praful Kolte",
      module: "C++",
      first: "4.1/5",
      second: "3.9/5.0",
      avg: "4.0/5.0",
      comments: "check",
    },
    {
      id: 2,
      prof: "Dr. Jane Smith",
      module: "Java",
      first: "4.5/5",
      second: "4.2/5.0",
      avg: "4.35/5.0",
      comments: "check",
    },
    {
      id: 3,
      prof: "Dr. Alan Turing",
      module: "Algorithms",
      first: "4.8/5",
      second: "4.9/5.0",
      avg: "4.85/5.0",
      comments: "check",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">FeedBack Reports</h1>
        <p className="text-gray-500">October 21, 2024</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">Sr No</th>
                <th className="p-3">Professor Name</th>
                <th className="p-3">Module</th>
                <th className="p-3">1st Feedback</th>
                <th className="p-3">2nd Feedback</th>
                <th className="p-3">Average Feedback</th>
                <th className="p-3">Comments</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">{report.id}</td>
                  <td className="p-3 font-medium">{report.prof}</td>
                  <td className="p-3">{report.module}</td>
                  <td className="p-3">{report.first}</td>
                  <td className="p-3">{report.second}</td>
                  <td className="p-3 font-semibold">{report.avg}</td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:underline font-semibold">
                      {report.comments}
                    </button>
                  </td>
                </tr>
              ))}
              {/* Empty rows for spacing */}
              {Array.from({ length: 5 - reports.length }).map((_, i) => (
                <tr
                  key={`empty-${i}`}
                  className="border-b border-gray-200 h-12"
                >
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeedbackReports;
