import React, { useState, useEffect, useMemo } from "react";
import { getScheduleByDate, getStudentsForAttendance, saveBulkAttendance } from "../../services/adminAttendanceService";

// --- FIX: Increased records to fetch all students (up to 200) ---
const RECORDS_PER_PAGE = 200; 
const COLUMNS = 3;

// Helper to format a Date object into a "YYYY-MM-DD" string
const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const Attendance = () => {
    const [students, setStudents] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [selectedDate, setSelectedDate] = useState(formatDateToString(new Date()));

    useEffect(() => {
        const fetchSchedule = async () => {
            if (!selectedDate) return;

            setIsLoading(true);
            setError(null);
            try {
                const scheduleForDate = await getScheduleByDate(selectedDate);
                setSchedule(scheduleForDate);
                setSelectedEntry(null);
                setStudents([]);
            } catch (err) {
                const formattedDate = new Date(selectedDate.replace(/-/g, '/')).toLocaleDateString();
                setError(`Failed to load schedule for ${formattedDate}.`);
                setSchedule([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSchedule();
    }, [selectedDate]);

    const handleSessionSelect = async (entry) => {
        if (!entry) {
            setSelectedEntry(null);
            setStudents([]);
            return;
        }
        setSelectedEntry(entry);
        setIsLoading(true);
        try {
            // This will now fetch up to 200 students
            const studentPage = await getStudentsForAttendance(entry.moduleId, 0, RECORDS_PER_PAGE);
            const studentsWithStatus = studentPage.content.map(s => ({ ...s, status: "P" }));
            setStudents(studentsWithStatus);
        } catch (err) {
            setError("Failed to load students for this session.");
            setStudents([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = (prn, newStatus) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.prn === prn ? { ...student, status: newStatus } : student
            )
        );
    };

    const handleSave = async () => {
        if (!selectedEntry) {
            alert("Please select a class session first.");
            return;
        }
        const attendanceData = {
            timetableEntryId: selectedEntry.timetableEntryId,
            attendanceDate: selectedDate,
            attendances: students.map(({ prn, status }) => ({
                studentPrn: prn,
                isPresent: status === "P",
            })),
        };
        try {
            await saveBulkAttendance(attendanceData);
            alert("Attendance saved successfully!");
        } catch (err) {
            alert("Failed to save attendance.");
        }
    };

    // --- FIX: Grid calculation is now more robust ---
    const rows = [];
    const rowsPerPage = Math.ceil(students.length / COLUMNS);
    for (let i = 0; i < rowsPerPage; i++) {
        const rowCells = [];
        for (let j = 0; j < COLUMNS; j++) {
            const studentIndex = i + j * rowsPerPage;
            const student = students[studentIndex];

            const statusSelectClasses = `w-full p-2 border-2 rounded text-center bg-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 ${
                student?.status === "P"
                ? "border-green-500 text-green-700 focus:ring-green-300"
                : "border-red-500 text-red-700 focus:ring-red-300"
            }`;

            if (student) {
                rowCells.push(
                    <React.Fragment key={`${student.prn}-frag`}>
                        <td className="p-2 text-center font-mono text-slate-600">{student.prn}</td>
                        <td className="p-2">
                            <select value={student.status} onChange={(e) => handleStatusChange(student.prn, e.target.value)} className={statusSelectClasses}>
                                <option value="P">P</option>
                                <option value="A">A</option>
                            </select>
                        </td>
                    </React.Fragment>
                );
            } else {
                rowCells.push(
                    <td className="p-2" key={`empty-prn-${j}`}></td>,
                    <td className="p-2" key={`empty-status-${j}`}></td>
                );
            }
        }
        rows.push( <tr key={i} className="hover:bg-gray-50">{rowCells}</tr> );
    }

    return (
        <div className="p-4 sm:p-8 bg-slate-50 min-h-full font-sans">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Attendance</h1>
                    <p className="text-slate-500 mt-1">Mark attendance for any date</p>
                </div>
                <div className="flex items-end gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
                        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div className="w-64">
                         <label className="block text-sm font-semibold text-gray-700 mb-2">Select Class Session</label>
                         <select
                            value={selectedEntry ? selectedEntry.timetableEntryId : ""}
                            onChange={(e) => {
                                const entryId = e.target.value ? parseInt(e.target.value) : null;
                                handleSessionSelect(schedule.find(s => s.timetableEntryId === entryId));
                            }}
                            className="w-full p-2 border rounded-lg"
                            disabled={isLoading || schedule.length === 0}
                         >
                              <option value="">-- Select a Class --</option>
                              {schedule.map(entry => (
                                  <option key={entry.timetableEntryId} value={entry.timetableEntryId}>
                                      {entry.moduleName} ({entry.startTime.substring(0,5)} - {entry.endTime.substring(0,5)})
                                  </option>
                              ))}
                         </select>
                    </div>
                </div>
            </div>

            {isLoading && !selectedEntry ? (
                <div className="text-center p-8">Loading Schedule...</div>
            ) : error ? (
                 <div className="text-center p-8 text-red-500">{error}</div>
            ) : (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <h2 className="text-xl font-semibold mb-4 text-slate-700">Mark Attendance for {selectedEntry ? selectedEntry.moduleName : '...'}</h2>
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
                                {isLoading ? (
                                    <tr><td colSpan={COLUMNS * 2} className="text-center p-8">Loading Students...</td></tr>
                                ) : students.length > 0 ? (
                                    rows
                                ) : (
                                    <tr>
                                        <td colSpan={COLUMNS * 2} className="text-center p-8 text-gray-500">
                                            {schedule.length === 0 && !isLoading ? "No classes scheduled for this date." : "Please select a class session to load students."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                     <div className="flex justify-end mt-6 pt-4 border-t border-slate-200">
                         <button onClick={handleSave} disabled={!selectedEntry || students.length === 0} className="px-6 py-2 rounded-md bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Save Attendance</button>
                     </div>
                </div>
            )}
        </div>
    );
};

export default Attendance;
