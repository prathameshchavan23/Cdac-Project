import React from "react";
import { Router } from "react-router";

const Attendance = () => {
  // Mock data
  const students = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    prn: `2902401201${33 + i}`,
    status: i === 0 ? "P" : "",
  }));

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
          <p className="text-gray-500">October 21, 2024</p>
        </div>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-900">
          Check Past Records
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Entry of Attendance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">PRN</th>
                <th className="border p-2">P/A</th>
                <th className="border p-2">PRN</th>
                <th className="border p-2">P/A</th>
                <th className="border p-2">PRN</th>
                <th className="border p-2">P/A</th>
                <th className="border p-2">Remark</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border p-2">{student.id}</td>
                  <td className="border p-2">{student.prn}</td>
                  <td className="border p-2">
                    <input
                      type="text"
                      defaultValue={student.status}
                      className="w-full text-center p-1 border-gray-300 rounded"
                    />
                  </td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border rounded-md bg-gray-800 text-white hover:bg-gray-900">
              previous
            </button>
            <button className="px-4 py-2 border rounded-md bg-gray-800 text-white">
              1
            </button>
            <button className="px-4 py-2 border rounded-md bg-white hover:bg-gray-100">
              2
            </button>
            <span>...</span>
            <button className="px-4 py-2 border rounded-md bg-white hover:bg-gray-100">
              8
            </button>
            <button className="px-4 py-2 border rounded-md bg-gray-800 text-white hover:bg-gray-900">
              next
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 border rounded-md bg-red-500 text-white hover:bg-red-600">
              Reset
            </button>
            <button className="px-6 py-2 border rounded-md bg-green-600 text-white hover:bg-green-700">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
