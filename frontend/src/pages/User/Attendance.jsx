import React, { useState, useEffect, useMemo } from 'react';
import { format, addDays, subDays, startOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// --- CHANGE: Import our new service function ---
import { getAttendanceByDate } from '../../services/attendanceService';

const Attendance = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    // --- CHANGE: State for live data, loading, and errors ---
    const [attendanceData, setAttendanceData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- CHANGE: Fetch data from the backend whenever the selected date changes ---
    useEffect(() => {
        const fetchDateData = async () => {
            setLoading(true);
            setError(null);
            const dateKey = format(selectedDate, 'yyyy-MM-dd');

            try {
                const data = await getAttendanceByDate(selectedDate);
                // Cache the fetched data to avoid re-fetching on the same day
                setAttendanceData(prevData => ({ ...prevData, [dateKey]: data }));
            } catch (err) {
                setError("Failed to load attendance data. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        // Only fetch if data for the selected date hasn't been fetched yet
        if (!attendanceData[format(selectedDate, 'yyyy-MM-dd')]) {
            fetchDateData();
        }
    }, [selectedDate, attendanceData]);

    const attendanceForSelectedDay = attendanceData[format(selectedDate, 'yyyy-MM-dd')] || [];

    const dailyStats = useMemo(() => {
        const dayRecords = attendanceForSelectedDay;
        const totalClasses = dayRecords.length;
        if (totalClasses === 0) return { attendance: 100, absent: 0, hasClasses: false };

        const attendedClasses = dayRecords.filter(record => record.status === 'Present').length;
        const attendancePercentage = Math.round((attendedClasses / totalClasses) * 100);
        
        return {
            attendance: attendancePercentage,
            absent: 100 - attendancePercentage,
            hasClasses: true,
        };
    }, [attendanceForSelectedDay]);

    // --- Date Selector Logic (No changes needed) ---
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

    const handlePrevWeek = () => setSelectedDate(subDays(selectedDate, 7));
    const handleNextWeek = () => setSelectedDate(addDays(selectedDate, 7));

    // --- Styling Logic (No changes needed) ---
    const summaryCardStyle = dailyStats.attendance >= 85 ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50';
    const summaryTextStyle = dailyStats.attendance >= 85 ? 'text-green-800' : 'text-red-800';
    const summaryPercentageStyle = dailyStats.attendance >= 85 ? 'text-green-600' : 'text-red-600';

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Attendance</h1>

                {/* --- DYNAMIC Summary Card for the SELECTED DAY --- */}
                {dailyStats.hasClasses ? (
                    <div className={`border-l-4 ${summaryCardStyle} p-4 rounded-lg mb-8`}>
                        <div className="flex items-center">
                            <div className="ml-3">
                                <p className={`text-sm font-semibold ${summaryTextStyle}`}>DAILY ATTENDANCE</p>
                                <p className={`text-4xl font-bold ${summaryPercentageStyle}`}>{dailyStats.attendance}%</p>
                                <p className={`text-sm font-medium ${summaryTextStyle}`}>{dailyStats.absent}% Absent</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="border-l-4 border-gray-300 bg-gray-50 p-4 rounded-lg mb-8">
                        <div className="flex items-center">
                            <div className="ml-3">
                                <p className="text-sm font-semibold text-gray-600">DAILY ATTENDANCE</p>
                                <p className="text-4xl font-bold text-gray-400">-</p>
                                <p className="text-sm font-medium text-gray-600">No classes scheduled</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Navigable Date Selector (No changes needed) --- */}
                <div className="flex items-center justify-between mb-4">
                    <button onClick={handlePrevWeek} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <ChevronLeft className="h-6 w-6 text-gray-600" />
                    </button>
                    <div className="flex-grow overflow-x-auto whitespace-nowrap no-scrollbar">
                        <div className="flex justify-center space-x-2">
                            {weekDays.map(day => {
                                const isSelected = format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                                return (
                                    <button
                                        key={day.toString()}
                                        onClick={() => setSelectedDate(day)}
                                        className={`px-4 py-2 rounded-lg text-center transition-colors duration-200 flex-shrink-0 ${
                                            isSelected
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <p className="font-bold text-lg">{format(day, 'dd')}</p>
                                        <p className="text-xs">{format(day, 'EEE')}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <button onClick={handleNextWeek} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <ChevronRight className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                <p className="text-center font-semibold text-gray-700 mb-8">{format(selectedDate, 'eeee, MMMM dd')}</p>

                {/* --- Daily Attendance List --- */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading classes...</div>
                    ) : error ? (
                        <div className="text-center py-12 text-red-500">{error}</div>
                    ) : attendanceForSelectedDay.length > 0 ? (
                        attendanceForSelectedDay.map((record, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-sm">
                                <div>
                                    <p className="text-xs text-gray-500">{record.courseCode}</p>
                                    <p className="font-bold text-gray-800">{record.courseName}</p>
                                    <p className="text-sm text-gray-500 mt-1">Start Time: {record.checkInTime}</p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                    record.status === 'Present'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {record.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                            <p className="text-gray-500">No classes scheduled for this day.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Attendance;