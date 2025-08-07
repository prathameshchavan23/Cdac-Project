import React, { useState, useEffect, useMemo } from 'react';
import { getUpcomingTimetable } from '../../services/studentTimetableService'; // Adjust path as needed
import { format, addDays, startOfToday } from 'date-fns';

const Timetable = () => {
    const [schedule, setSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimetable = async () => {
            setIsLoading(true);
            try {
                const data = await getUpcomingTimetable();
                setSchedule(data);
            } catch (err) {
                setError("Failed to load your timetable. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchTimetable();
    }, []);

    // Data Processing: Group classes by date
    const groupedSchedule = useMemo(() => {
        return schedule.reduce((acc, currentClass) => {
            const date = currentClass.lectureDate;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(currentClass);
            return acc;
        }, {});
    }, [schedule]);

    // Generate the next 7 days for rendering
    const today = startOfToday();
    const upcomingDays = Array.from({ length: 7 }).map((_, i) => addDays(today, i));

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">My Timetable</h1>
                <p className="text-gray-600 mb-8">Your class schedule for the next 7 days.</p>
                
                {isLoading && <div className="text-center py-12">Loading schedule...</div>}
                {error && <div className="text-center py-12 text-red-500">{error}</div>}

                {!isLoading && !error && (
                    <div className="space-y-8">
                        {upcomingDays.map(day => {
                            const dateKey = format(day, 'yyyy-MM-dd');
                            const classesForDay = groupedSchedule[dateKey] || [];
                            
                            return (
                                <div key={dateKey}>
                                    <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
                                        {format(day, 'eeee, MMMM dd')}
                                    </h2>
                                    {classesForDay.length > 0 ? (
                                        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {classesForDay.map(item => (
                                                        <tr key={item.timetableEntryId}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                                {new Date(`1970-01-01T${item.startTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                {' - '}
                                                                {new Date(`1970-01-01T${item.endTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.moduleName}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.instructorName}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.roomNumber}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 bg-white rounded-lg border border-gray-200">
                                            <p className="text-gray-500">No classes scheduled for this day.</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Timetable;
