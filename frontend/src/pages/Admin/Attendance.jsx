import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";

// --- Configuration ---
const RECORDS_PER_PAGE = 30; // Display 30 students per page
const COLUMNS = 3; // The table will have 3 pairs of PRN/Status columns

// --- Helper to SIMULATE a backend fetch ---
const fetchStudentsFromBackend = (count = 250) => {
  console.log("Fetching student data from backend...");
  // In a real app, this would be an API call, e.g., using fetch() or axios.
  return new Promise((resolve) => {
    setTimeout(() => {
      const studentData = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        prn: `290240120${100 + i}`, // Pre-filled PRN from backend
        status: "P", // Default status to Present
      }));
      resolve(studentData);
    }, 500); // Simulate network delay
  });
};

const Attendance = () => {
  // --- State Management ---
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Data Fetching Effect ---
  useEffect(() => {
    fetchStudentsFromBackend().then((data) => {
      setStudents(data);
      setIsLoading(false);
    });
  }, []); // Empty dependency array means this runs once on component mount

  // --- Filtering and Pagination Logic ---
  const filteredStudents = useMemo(() => {
    if (!searchTerm) {
      return students;
    }
    return students.filter((student) => student.prn.includes(searchTerm));
  }, [students, searchTerm]);

  const totalPages = Math.ceil(filteredStudents.length / RECORDS_PER_PAGE);
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const endIndex = startIndex + RECORDS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  // --- Handlers ---
  const handleStatusChange = (id, newStatus) => {
    const newStudents = students.map((student) => {
      if (student.id === id) {
        return { ...student, status: newStatus };
      }
      return student;
    });
    setStudents(newStudents);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    // Validation: only allow numbers in the search input
    if (/^\d*$/.test(value)) {
      setSearchTerm(value);
      setCurrentPage(1); // Reset to the first page on a new search
    }
  };

  const handleReset = () => {
    // Resets only the current page's student statuses
    const newStudents = [...students];
    // Note: We iterate through the original students array but use indices from the paginated view
    // to identify which students are currently visible and need resetting.
    const visibleStudentIds = new Set(paginatedStudents.map((s) => s.id));
    const updatedStudents = newStudents.map((student) => {
      if (visibleStudentIds.has(student.id)) {
        return { ...student, status: "P" };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const handleSave = () => {
    // In a real app, you would send this data to an API
    const dataToSave = paginatedStudents.map(({ id, prn, status }) => ({
      id,
      prn,
      status,
    }));
    console.log("Saving Attendance Data:", dataToSave);
    alert(
      "Attendance data for the current page has been saved! (Check console for data)"
    );
  };

  // --- Table Rendering Logic ---
  const rows = [];
  const rowsPerPage = Math.ceil(RECORDS_PER_PAGE / COLUMNS);
  for (let i = 0; i < rowsPerPage; i++) {
    const rowCells = [];
    for (let j = 0; j < COLUMNS; j++) {
      const studentIndex = i + j * rowsPerPage;
      const student = paginatedStudents[studentIndex];

      const statusSelectClasses = `w-full p-2 border-2 rounded text-center bg-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 ${
        student?.status === "P"
          ? "border-green-500 text-green-700 focus:ring-green-300"
          : "border-red-500 text-red-700 focus:ring-red-300"
      }`;

      if (student) {
        rowCells.push(
          <React.Fragment key={`${student.id}-frag`}>
            <td className="p-2 text-center font-mono text-slate-600">
              {student.prn}
            </td>
            <td className="p-2">
              <select
                value={student.status}
                onChange={(e) => handleStatusChange(student.id, e.target.value)}
                className={statusSelectClasses}
              >
                <option value="P">P</option>
                <option value="A">A</option>
              </select>
            </td>
          </React.Fragment>
        );
      } else {
        // Render empty cells to maintain table structure
        rowCells.push(
          <td className="p-2" key={`empty-prn-${j}`}></td>,
          <td className="p-2" key={`empty-status-${j}`}></td>
        );
      }
    }
    rows.push(
      <tr key={i} className="hover:bg-gray-50">
        {rowCells}
      </tr>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading student data...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-full font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Attendance</h1>
          <p className="text-slate-500 mt-1">
            For{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by PRN..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-700">
          Entry of Attendance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead className="bg-slate-700 text-white">
              <tr>
                {Array.from({ length: COLUMNS }).map((_, index) => (
                  <React.Fragment key={index}>
                    <th className="p-3 font-semibold tracking-wider">PRN</th>
                    <th className="p-3 font-semibold tracking-wider">P/A</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedStudents.length > 0 ? (
                rows
              ) : (
                <tr>
                  <td
                    colSpan={COLUMNS * 2}
                    className="text-center p-8 text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Search size={48} className="text-gray-300" />
                      <p className="font-semibold">No students found</p>
                      <p className="text-sm">
                        No student PRN matches "{searchTerm}".
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-slate-200">
          {/* Pagination Controls */}
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md bg-slate-700 text-white hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="font-semibold text-slate-600">
              Page {currentPage} of {totalPages > 0 ? totalPages : 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 border rounded-md bg-slate-700 text-white hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
