import React from 'react';

const Timetable = () => {
    // Mock data
    const schedule = [
        { time: '9:00 AM - 9:50 AM', course: 'Math 101', professor: 'Dr. Eleanor Vance', room: 'Room 201' },
        { time: '10:00 AM - 10:50 AM', course: 'History 202', professor: 'Prof. Samuel Bennett', room: 'Room 305' },
        { time: '11:00 AM - 11:50 AM', course: 'Physics Lab', professor: 'Dr. Olivia Carter', room: 'Lab 102' },
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Timetable</h1>
                    <p className="text-gray-500">October 21, 2024</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700">+ Add Class/Event</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                 <table className="w-full text-left">
                    <thead className="border-b text-gray-500">
                        <tr>
                            <th className="p-3 font-semibold">Time</th>
                            <th className="p-3 font-semibold">Course</th>
                            <th className="p-3 font-semibold">Professor</th>
                            <th className="p-3 font-semibold">Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100">
                                <td className="p-3 text-gray-600">{item.time}</td>
                                <td className="p-3 text-gray-800 font-medium">{item.course}</td>
                                <td className="p-3 text-gray-600">{item.professor}</td>
                                <td className="p-3 text-gray-600">{item.room}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Timetable;
