import React, { useState, useEffect } from "react";
import {
  Search,
  User,
  Calendar,
  BookOpen,
  Award,
  TrendingUp,
} from "lucide-react";

// Mock data - in real implementation, this would come from API based on logged-in student
const studentMarksData = [
  {
    id: 1,
    prn: "290240120133",
    name: "Saad Shaikh",
    lab: 34,
    internal: 19,
    total: 53,
    remark: "P",
    module: "DSA",
    examDate: "19/07/2025",
  },
  {
    id: 2,
    prn: "290240120133",
    name: "Saad Shaikh",
    lab: 38,
    internal: 18,
    total: 56,
    remark: "P",
    module: "DBMS",
    examDate: "22/07/2025",
  },
  {
    id: 3,
    prn: "290240120133",
    name: "Saad Shaikh",
    lab: 42,
    internal: 20,
    total: 62,
    remark: "P",
    module: "OS",
    examDate: "25/07/2025",
  },
  {
    id: 4,
    prn: "290240120133",
    name: "Saad Shaikh",
    lab: 28,
    internal: 15,
    total: 43,
    remark: "P",
    module: "CN",
    examDate: "28/07/2025",
  },
  {
    id: 5,
    prn: "290240120133",
    name: "Saad Shaikh",
    lab: 25,
    internal: 12,
    total: 37,
    remark: "F",
    module: "SE",
    examDate: "01/08/2025",
  },
];

const RECORDS_PER_PAGE = 5;

const StudentMarksViewer = () => {
  const [marks, setMarks] = useState(studentMarksData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMarks, setFilteredMarks] = useState(studentMarksData);

  // Get student info (assuming all records belong to the same student)
  const studentInfo =
    marks.length > 0
      ? {
          name: marks[0].name,
          prn: marks[0].prn,
        }
      : { name: "", prn: "" };

  // Filter marks based on search term
  useEffect(() => {
    const filtered = marks.filter(
      (mark) =>
        mark.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mark.examDate.includes(searchTerm)
    );
    setFilteredMarks(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, marks]);

  const totalPages = Math.ceil(filteredMarks.length / RECORDS_PER_PAGE);
  const paginatedMarks = filteredMarks.slice(
    (currentPage - 1) * RECORDS_PER_PAGE,
    currentPage * RECORDS_PER_PAGE
  );

  const getGradeColor = (remark) => {
    return remark === "P"
      ? "text-green-600 bg-green-50"
      : "text-red-600 bg-red-50";
  };

  const getPerformanceLevel = (total) => {
    if (total >= 55) return { level: "Excellent", color: "text-green-600" };
    if (total >= 50) return { level: "Good", color: "text-blue-600" };
    if (total >= 40) return { level: "Average", color: "text-yellow-600" };
    return { level: "Needs Improvement", color: "text-red-600" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  My Academic Performance
                </h1>
                <p className="text-gray-600">
                  <span className="font-semibold">{studentInfo.name}</span> •
                  PRN: {studentInfo.prn}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Academic Year 2024-25
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by module name or exam date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Marks Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Examination Results
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="p-4 font-semibold">Sr. No</th>
                    <th className="p-4 font-semibold">Module</th>
                    <th className="p-4 font-semibold">Exam Date</th>
                    <th className="p-4 font-semibold">Lab Marks</th>
                    <th className="p-4 font-semibold">Internal Marks</th>
                    <th className="p-4 font-semibold">Total Marks</th>
                    <th className="p-4 font-semibold">Result</th>
                    <th className="p-4 font-semibold">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMarks.map((mark, index) => {
                    const performance = getPerformanceLevel(mark.total);
                    return (
                      <tr
                        key={mark.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 text-gray-600">
                          {(currentPage - 1) * RECORDS_PER_PAGE + index + 1}
                        </td>
                        <td className="p-4 font-semibold text-gray-800">
                          {mark.module}
                        </td>
                        <td className="p-4 text-gray-600">{mark.examDate}</td>
                        <td className="p-4 text-center">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                            {mark.lab}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                            {mark.internal}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-lg font-bold text-gray-800">
                            {mark.total}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(
                              mark.remark
                            )}`}
                          >
                            {mark.remark === "P" ? "PASS" : "FAIL"}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`text-sm font-medium ${performance.color}`}
                          >
                            {performance.level}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredMarks.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-500">
                  No results found for "{searchTerm}"
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page + 1}
                    onClick={() => setCurrentPage(page + 1)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      currentPage === page + 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-gray-50 border-gray-300"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Important Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <p>
                <strong>Passing Marks:</strong> Minimum 40 marks required to
                pass
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <p>
                <strong>Lab Exam:</strong> Practical examination marks
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
              <p>
                <strong>Internal Marks:</strong> Continuous assessment marks
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
              <p>
                <strong>Total Marks:</strong> Sum of lab and internal marks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMarksViewer;
