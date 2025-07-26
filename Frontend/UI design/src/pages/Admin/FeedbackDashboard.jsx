import React from 'react';
import { Link, useParams } from 'react-router-dom';

// --- Mock Data ---
// In a real app, you'd fetch this data based on the ID from the URL
const feedbackSummaryData = {
    1: { instructorName: 'Praful', moduleName: 'Core Java', avgRating: '4.1/5.0', totalSubmissions: 169, pending: 46 },
    2: { instructorName: 'Saad', moduleName: 'C++', avgRating: '4.5/5.0', totalSubmissions: 180, pending: 35 },
    3: { instructorName: 'Saurabh', moduleName: 'DBMS', avgRating: '3.9/5.0', totalSubmissions: 150, pending: 65 },
};

const FeedbackDashboard = () => {
    // Get the feedback ID from the URL
    const { feedbackId } = useParams();
    const data = feedbackSummaryData[feedbackId] || { instructorName: 'N/A', moduleName: 'N/A', avgRating: 'N/A', totalSubmissions: 0, pending: 0 };

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Feedback Dashboard</h1>
                <p className="text-slate-500 mt-1">
                    Summary for <span className="font-semibold">{data.instructorName}</span> on <span className="font-semibold">{data.moduleName}</span>
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-blue-100 border border-blue-300 rounded-xl text-center">
                    <p className="text-lg text-blue-800">Average Rating</p>
                    <p className="text-5xl font-bold text-blue-900 my-2">{data.avgRating}</p>
                </div>
                <div className="p-6 bg-green-100 border border-green-300 rounded-xl text-center">
                    <p className="text-lg text-green-800">Total Submissions</p>
                    <p className="text-5xl font-bold text-green-900 my-2">{data.totalSubmissions}</p>
                    <p className="text-md text-green-800">Submitted</p>
                </div>
                <div className="p-6 bg-red-100 border border-red-300 rounded-xl text-center">
                    <p className="text-lg text-red-800">Pending</p>
                    <p className="text-5xl font-bold text-red-900 my-2">{data.pending}</p>
                    <p className="text-md text-red-800">Remaining</p>
                </div>
            </div>

            <div className="flex justify-end">
                <Link to={`/staff/feedback/reports/${feedbackId}`} className="bg-gray-800 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-gray-900">
                    Check Comments
                </Link>
            </div>
        </div>
    );
};

export default FeedbackDashboard;
