import React from 'react';

const Registration = () => {
    // Mock data based on the provided image
    const students = [
        { srNo: 1, prn: '290240120133', name: 'Saad Shaikh', lab: 34, internal: 19, total: 53, remark: 'P' },
        { srNo: 2, prn: '290240120134', name: 'Jane Doe', lab: 38, internal: 18, total: 56, remark: 'P' },
        { srNo: 3, prn: '290240120135', name: 'John Smith', lab: 30, internal: 15, total: 45, remark: 'P' },
        { srNo: 4, prn: '290240120136', name: 'Emily Jones', lab: 40, internal: 20, total: 60, remark: 'P' },
        { srNo: 5, prn: '290240120137', name: 'Michael Johnson', lab: 25, internal: 12, total: 37, remark: 'F' },
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Registration - Student Marks</h1>
                <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700">+ Add New Marks</button>
                    <button className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">Check previous record</button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="mb-4">
                    <p><span className="font-semibold">Module:</span> DSA</p>
                    <p><span className="font-semibold">Exam Date:</span> 19/07/2025</p>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="p-3">Sr. No</th>
                            <th className="p-3">PRN</th>
                            <th className="p-3">Student Name</th>
                            <th className="p-3">Lab Exam Marks</th>
                            <th className="p-3">Internal Marks</th>
                            <th className="p-3">Total Marks</th>
                            <th className="p-3">Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.srNo} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="p-3">{student.srNo}</td>
                                <td className="p-3">{student.prn}</td>
                                <td className="p-3 font-medium">{student.name}</td>
                                <td className="p-3">{student.lab}</td>
                                <td className="p-3">{student.internal}</td>
                                <td className="p-3 font-semibold">{student.total}</td>
                                <td className={`p-3 font-bold ${student.remark === 'P' ? 'text-green-600' : 'text-red-600'}`}>{student.remark}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="flex justify-center items-center mt-6 space-x-2">
                    <button className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100">previous</button>
                    <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">1</button>
                    <button className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100">2</button>
                    <span>...</span>
                    <button className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100">10</button>
                    <button className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100">next</button>
                </div>
            </div>
        </div>
    );
};

export default Registration;
