import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// --- Mock Data ---
// In a real app, you'd fetch this data based on the ID from the URL
const initialReports = {
    1: [
        { id: 101, first: "4/5", second: "4.5/5", comment: "Excellent teaching style, very clear." },
        { id: 102, first: "3/5", second: "4/5", comment: "Pacing was a bit fast at times." },
        { id: 103, first: "5/5", second: "5/5", comment: "Best professor for this subject!" },
    ],
    2: [
        { id: 201, first: "5/5", second: "4.5/5", comment: "Very engaging and helpful." },
    ],
    3: [
        { id: 301, first: "3/5", second: "3.5/5", comment: "More practical examples would be useful." },
        { id: 302, first: "4/5", second: "4/5", comment: "Good overall." },
    ],
};

const FeedbackReports = () => {
    const { feedbackId } = useParams();
    const [reports, setReports] = useState(initialReports[feedbackId] || []);

    const handleDeleteComment = (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            setReports(reports.filter(report => report.id !== commentId));
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Feedback Reports</h1>
                <p className="text-slate-500 mt-1">Detailed comments and ratings</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-3">Sr No.</th>
                                <th className="p-3">1st Feedback</th>
                                <th className="p-3">2nd Feedback</th>
                                <th className="p-3">Comment</th>
                                <th className="p-3 text-center">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr key={report.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 font-semibold">{report.first}</td>
                                    <td className="p-3 font-semibold">{report.second}</td>
                                    <td className="p-3">{report.comment}</td>
                                    <td className="p-3 text-center">
                                        <button onClick={() => handleDeleteComment(report.id)} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 mx-auto">
                                            <span className="material-icons text-sm">delete</span> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {reports.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center p-8 text-gray-500">No comments to display.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FeedbackReports;
