import React, { useState, useMemo } from 'react';
import { Edit, X, Plus, Trash2 } from 'lucide-react';

// ===================================================================================
// --- MOCK DATA (DATABASE SIMULATION) ---
// In a real application, this data would be fetched from your backend API.
// ===================================================================================

const initialFeedbacks = [
    { id: 1, instructorName: 'Praful', moduleName: 'Core Java', status: 'Active', lastDate: '2025-08-10' },
    { id: 2, instructorName: 'Saad', moduleName: 'C++', status: 'Active', lastDate: '2025-08-12' },
    { id: 3, instructorName: 'Saurabh', moduleName: 'DBMS', status: 'Closed', lastDate: '2025-07-20' },
];

const facultyOptions = ['Praful', 'Saad', 'Saurabh', 'Dr. Eleanor Vance'];
const moduleOptions = ['Core Java', 'C++', 'DBMS', 'Data Structures', 'Algorithms'];

const feedbackSummaryData = {
    1: { instructorName: 'Praful', moduleName: 'Core Java', avgRating: '4.1/5.0', totalSubmissions: 169, pending: 46 },
    2: { instructorName: 'Saad', moduleName: 'C++', avgRating: '4.5/5.0', totalSubmissions: 180, pending: 35 },
    3: { instructorName: 'Saurabh', moduleName: 'DBMS', avgRating: '3.9/5.0', totalSubmissions: 150, pending: 65 },
};

const initialReports = {
    1: [
        { id: 101, first: "4/5", second: "4.5/5", comment: "Excellent teaching style, very clear." },
        { id: 102, first: "3/5", second: "4/5", comment: "Pacing was a bit fast at times." },
        { id: 103, first: "5/5", second: "5/5", comment: "Best professor for this subject!" },
    ],
    2: [ { id: 201, first: "5/5", second: "4.5/5", comment: "Very engaging and helpful." } ],
    3: [
        { id: 301, first: "3/5", second: "3.5/5", comment: "More practical examples would be useful." },
        { id: 302, first: "4/5", second: "4/5", comment: "Good overall." },
    ],
};


// ===================================================================================
// --- MAIN COMPONENT: FeedbackFeature ---
// This single component manages the state and renders one of three views:
// FeedbackList: The main table of all feedback instances.
// ===================================================================================

const Feedback = () => {
    // --- STATE MANAGEMENT ---
    const [view, setView] = useState('list'); // 'list', 'dashboard', or 'reports'
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
    const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
    const [reports, setReports] = useState(initialReports);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editingFeedback, setEditingFeedback] = useState(null);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [feedbackToDelete, setFeedbackToDelete] = useState(null);
    const [newFeedback, setNewFeedback] = useState({ moduleName: '', instructorName: '', lastDate: '' });

    // --- NAVIGATION HANDLERS ---
    const navigateToDashboard = (id) => {
        setSelectedFeedbackId(id);
        setView('dashboard');
    };
    const navigateToReports = (id) => {
        setSelectedFeedbackId(id);
        setView('reports');
    };
    const navigateToList = () => {
        setSelectedFeedbackId(null);
        setView('list');
    };

    // --- DATA HANDLERS ---
    const handleAddFeedback = (e) => {
        e.preventDefault();
        const newId = feedbacks.length > 0 ? Math.max(...feedbacks.map(f => f.id)) + 1 : 1;
        const newEntry = { id: newId, ...newFeedback, status: 'Active' };
        setFeedbacks([...feedbacks, newEntry]);
        setNewFeedback({ moduleName: '', instructorName: '', lastDate: '' });
        setAddModalOpen(false);
    };
    
    const handleEditClick = (feedback) => {
        setEditingFeedback(feedback);
        setEditModalOpen(true);
    };

    const handleUpdateFeedback = (e) => {
        e.preventDefault();
        setFeedbacks(feedbacks.map(f => f.id === editingFeedback.id ? editingFeedback : f));
        setEditModalOpen(false);
        setEditingFeedback(null);
    };

    const handleDeleteClick = (id) => {
        setFeedbackToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        setFeedbacks(feedbacks.filter(f => f.id !== feedbackToDelete));
        setDeleteConfirmOpen(false);
        setFeedbackToDelete(null);
    };

    const handleDeleteComment = (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            const updatedReports = { ...reports };
            updatedReports[selectedFeedbackId] = updatedReports[selectedFeedbackId].filter(report => report.id !== commentId);
            setReports(updatedReports);
        }
    };

    // ===================================================================================
    // --- RENDER LOGIC ---
    // Conditionally render the correct view based on the 'view' state.
    // ===================================================================================

    // -----------------------------------------------------------------------------------
    // --- VIEW 1: Feedback List (Main Page) ---
    // -----------------------------------------------------------------------------------
    if (view === 'list') {
        return (
            <>
                {/* Add/Edit Modals */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative">
                            <button onClick={() => setAddModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                            <h2 className="text-2xl font-bold mb-6 text-center">Add New Feedback</h2>
                            <form onSubmit={handleAddFeedback} className="space-y-6">
                                <div>
                                    <label htmlFor="moduleName" className="block text-sm font-medium text-gray-700 mb-1">Module Name</label>
                                    <select id="moduleName" value={newFeedback.moduleName} onChange={e => setNewFeedback({...newFeedback, moduleName: e.target.value})} className="w-full p-3 border rounded-lg bg-white" required>
                                        <option value="" disabled>Select Module</option>
                                        {moduleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="instructorName" className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
                                    <select id="instructorName" value={newFeedback.instructorName} onChange={e => setNewFeedback({...newFeedback, instructorName: e.target.value})} className="w-full p-3 border rounded-lg bg-white" required>
                                        <option value="" disabled>Select Instructor</option>
                                        {facultyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="lastDate" className="block text-sm font-medium text-gray-700 mb-1">Last Date</label>
                                    <input id="lastDate" type="date" value={newFeedback.lastDate} onChange={e => setNewFeedback({...newFeedback, lastDate: e.target.value})} className="w-full p-3 border rounded-lg" required />
                                </div>
                                <div className="flex justify-end gap-4 pt-4">
                                    <button type="button" onClick={() => setAddModalOpen(false)} className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">Submit Feedback</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative">
                            <button onClick={() => setEditModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                            <h2 className="text-2xl font-bold mb-6 text-center">Edit Feedback</h2>
                            <form onSubmit={handleUpdateFeedback} className="space-y-6">
                                <div>
                                    <label htmlFor="editModuleName" className="block text-sm font-medium text-gray-700 mb-1">Module Name</label>
                                    <select id="editModuleName" value={editingFeedback.moduleName} onChange={e => setEditingFeedback({...editingFeedback, moduleName: e.target.value})} className="w-full p-3 border rounded-lg bg-white" required>
                                        {moduleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="editInstructorName" className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
                                    <select id="editInstructorName" value={editingFeedback.instructorName} onChange={e => setEditingFeedback({...editingFeedback, instructorName: e.target.value})} className="w-full p-3 border rounded-lg bg-white" required>
                                        {facultyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div className="flex justify-end gap-4 pt-4">
                                    <button type="button" onClick={() => setEditModalOpen(false)} className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">Update Feedback</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {isDeleteConfirmOpen && (
                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                         <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-center">
                            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                            <p className="text-slate-600 mb-6">Are you sure you want to delete this feedback entry? This action cannot be undone.</p>
                            <div className="flex justify-center gap-4">
                                <button onClick={() => setDeleteConfirmOpen(false)} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300">No, Cancel</button>
                                <button onClick={handleConfirmDelete} className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">Yes, Delete</button>
                            </div>
                         </div>
                     </div>
                )}

                <div className="p-8 bg-slate-50 min-h-full">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">Feedback</h1>
                            <p className="text-slate-500 mt-1">Manage feedback schedules and reports</p>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => setAddModalOpen(true)} className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-900 flex items-center gap-2">
                                <Plus size={18} /> Add New Feedback
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b-2 border-slate-200 text-slate-600">
                                    <tr>
                                        <th className="p-4 font-semibold">Instructor Name</th>
                                        <th className="p-4 font-semibold">Module Name</th>
                                        <th className="p-4 font-semibold">Feedback Report</th>
                                        <th className="p-4 font-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedbacks.map((item) => (
                                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="p-4 font-medium text-slate-800">{item.instructorName}</td>
                                            <td className="p-4 text-slate-600">{item.moduleName}</td>
                                            <td className="p-4">
                                                <button onClick={() => navigateToDashboard(item.id)} className="text-blue-600 font-semibold cursor-pointer hover:underline">
                                                    Check
                                                </button>
                                            </td>
                                            <td className="p-4 flex justify-center items-center gap-2">
                                                <button onClick={() => handleEditClick(item)} className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm flex items-center gap-1"><Edit size={14} />Edit</button>
                                                <button onClick={() => handleDeleteClick(item.id)} className="bg-red-600 text-white px-4 py-1 rounded-md text-sm flex items-center gap-1"><Trash2 size={14} />Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // -----------------------------------------------------------------------------------
    // --- VIEW 2: Feedback Dashboard (Summary Page) ---
    // -----------------------------------------------------------------------------------
    if (view === 'dashboard') {
        const data = feedbackSummaryData[selectedFeedbackId] || { instructorName: 'N/A', moduleName: 'N/A', avgRating: 'N/A', totalSubmissions: 0, pending: 0 };
        return (
            <div className="p-8 bg-slate-50 min-h-full">
                <button onClick={navigateToList} className="mb-6 text-blue-600 hover:underline font-semibold flex items-center gap-1">
                    &larr; Back to List
                </button>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">Feedback Dashboard</h1>
                    <p className="text-slate-500 mt-1">Summary for <span className="font-semibold">{data.instructorName}</span> on <span className="font-semibold">{data.moduleName}</span></p>
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
                    <button onClick={() => navigateToReports(selectedFeedbackId)} className="bg-gray-800 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-gray-900">
                        Check Comments
                    </button>
                </div>
            </div>
        );
    }

    // -----------------------------------------------------------------------------------
    // --- VIEW 3: Feedback Reports (Detailed Comments) ---
    // -----------------------------------------------------------------------------------
    if (view === 'reports') {
        const reportData = reports[selectedFeedbackId] || [];
        return (
            <div className="p-8 bg-slate-50 min-h-full">
                <button onClick={navigateToList} className="mb-6 text-blue-600 hover:underline font-semibold flex items-center gap-1">
                    &larr; Back to List
                </button>
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
                                {reportData.map((report, index) => (
                                    <tr key={report.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3 font-semibold">{report.first}</td>
                                        <td className="p-3 font-semibold">{report.second}</td>
                                        <td className="p-3">{report.comment}</td>
                                        <td className="p-3 text-center">
                                            <button onClick={() => handleDeleteComment(report.id)} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 mx-auto">
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {reportData.length === 0 && (
                                    <tr><td colSpan="5" className="text-center p-8 text-gray-500">No comments to display.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
};

export default Feedback;
