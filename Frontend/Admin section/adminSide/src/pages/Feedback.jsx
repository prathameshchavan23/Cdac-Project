import React from 'react';
import Icon from '../components/Icon'; // Make sure to import the Icon component

const Feedback = () => {
    // Mock data
    const feedbacks = [
        { name: 'Core Java', report: 'Check' },
        { name: 'C++', report: 'Check' },
        { name: 'DBMS', report: 'Check' },
    ];
    
    return (
        <div className="p-8 bg-gray-50 min-h-full flex space-x-8">
            {/* Left Column */}
            <div className="w-1/3">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <button>&lt;</button>
                        <h3 className="font-semibold">October 2024</h3>
                        <button>&gt;</button>
                    </div>
                    <div className="grid grid-cols-7 text-center text-sm text-gray-500">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
                        {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                            <div key={day} className={`p-1 ${day === 5 ? 'bg-blue-600 text-white rounded-full' : ''}`}>{day}</div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-semibold mb-4">Upcoming Events</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start"><Icon path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 14.25h.008v.008H12v-.008z" className="w-5 h-5 mr-3 mt-1 text-gray-500"/><div><p className="font-medium">Math 101 Exam</p><p className="text-sm text-gray-500">Oct 21, 2024</p></div></li>
                        <li className="flex items-start"><Icon path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 14.25h.008v.008H12v-.008z" className="w-5 h-5 mr-3 mt-1 text-gray-500"/><div><p className="font-medium">History 202 Lecture</p><p className="text-sm text-gray-500">Oct 22, 2024</p></div></li>
                        <li className="flex items-start"><Icon path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 14.25h.008v.008H12v-.008z" className="w-5 h-5 mr-3 mt-1 text-gray-500"/><div><p className="font-medium">Physics Lab</p><p className="text-sm text-gray-500">Oct 23, 2024</p></div></li>
                    </ul>
                </div>
            </div>
            {/* Right Column */}
            <div className="w-2/3">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">FeedBack</h1>
                        <p className="text-gray-500">October 21, 2024</p>
                    </div>
                     <div className="flex space-x-2">
                        <button className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-900">+ Add New FeedBack</button>
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-900">Check Past Records</button>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <table className="w-full text-left">
                        <thead className="border-b text-gray-600">
                            <tr>
                                <th className="p-3">Module Name</th>
                                <th className="p-3">Feedback Report</th>
                                <th className="p-3">Edit</th>
                                <th className="p-3">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((item, index) => (
                                <tr key={index} className="border-b border-gray-100">
                                    <td className="p-3 font-medium">{item.name}</td>
                                    <td className="p-3 text-blue-600 font-semibold cursor-pointer hover:underline">{item.report}</td>
                                    <td className="p-3"><button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm">Edit</button></td>
                                    <td className="p-3"><button className="bg-red-600 text-white px-4 py-1 rounded-md text-sm">Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
