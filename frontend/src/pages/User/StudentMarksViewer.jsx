import React, { useState, useEffect } from "react";
import { Search, User, Calendar } from "lucide-react";
// --- CHANGE: Import our service function to fetch marks ---
import { getMyMarks } from "../../services/studentMarksService"; 

const RECORDS_PER_PAGE = 5;

const StudentMarksViewer = () => {
  // --- CHANGE: Initialize state as empty ---
  const [marks, setMarks] = useState([]);
  const [profile, setProfile] = useState({ name: '', prn: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMarks, setFilteredMarks] = useState([]);

  // --- CHANGE: Fetch live data from the backend API ---
  useEffect(() => {
    const fetchMarksData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMyMarks();
        setMarks(data);
        setFilteredMarks(data); // Initially, filtered list is the full list
        if (data.length > 0) {
          setProfile({ name: data[0].studentName, prn: data[0].studentPrn });
        }
      } catch (err) {
        setError("Failed to fetch your marks. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarksData();
  }, []);

  // --- CHANGE: All filtering and pagination logic now works on the fetched data ---
  useEffect(() => {
    const filtered = marks.filter(
      (mark) =>
        mark.moduleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mark.examDate.includes(searchTerm)
    );
    setFilteredMarks(filtered);
    setCurrentPage(1);
  }, [searchTerm, marks]);

  const totalPages = Math.ceil(filteredMarks.length / RECORDS_PER_PAGE);
  const paginatedMarks = filteredMarks.slice(
    (currentPage - 1) * RECORDS_PER_PAGE,
    currentPage * RECORDS_PER_PAGE
  );

  const getGradeColor = (remark) => {
    return remark === "P" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50";
  };
  
  // Note: This logic is now purely on the frontend as requested
  const getPerformanceLevel = (total) => {
    if (total >= 55) return { level: "Excellent", color: "text-green-600" };
    if (total >= 50) return { level: "Good", color: "text-blue-600" };
    if (total >= 40) return { level: "Average", color: "text-yellow-600" };
    return { level: "Needs Improvement", color: "text-red-600" };
  };

  if (loading) {
    return <div className="text-center p-12">Loading Marks...</div>;
  }

  if (error) {
    return <div className="text-center p-12 text-red-600">{error}</div>;
  }

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
                        <h1 className="text-2xl font-bold text-gray-800">My Academic Performance</h1>
                        <p className="text-gray-600">
                            <span className="font-semibold">{profile.name}</span> • PRN: {profile.prn}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Academic Year 2024-25</span>
                </div>
            </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by module name or exam date (YYYY-MM-DD)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
        </div>

        {/* --- CHANGE: The JSX below now uses the ScoreResponse DTO fields and calculates total/remark --- */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Examination Results</h2>
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
                    const totalMarks = (mark.labExamMarks || 0) + (mark.internalMarks || 0);
                    const remark = (mark.labExamMarks !== null && mark.labExamMarks < 16) ? "F" : "P"; // Assuming 40 is passing
                    const performance = getPerformanceLevel(totalMarks);
                    return (
                      <tr key={mark.scoreId} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-gray-600">{(currentPage - 1) * RECORDS_PER_PAGE + index + 1}</td>
                        <td className="p-4 font-semibold text-gray-800">{mark.moduleName}</td>
                        <td className="p-4 text-gray-600">{mark.examDate}</td>
                        <td className="p-4 text-center">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">{mark.labExamMarks}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">{mark.internalMarks}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-lg font-bold text-gray-800">{totalMarks}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(remark)}`}>
                            {remark === "P" ? "PASS" : "FAIL"}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`text-sm font-medium ${performance.color}`}>{performance.level}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* ... Pagination and other sections ... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMarksViewer;