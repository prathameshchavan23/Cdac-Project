import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnonymousFeedback, deleteFeedbackComment } from '../../services/adminfeedbackService';
import { Trash2, X } from "lucide-react";

// --- A simple, self-contained notification component ---
const Notification = ({ message, type, onclose }) => {
    if (!message) return null;

    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-xl text-white transition-opacity duration-300 z-50";
    const typeClasses = type === 'success' ? 'bg-green-600' : 'bg-red-600';

    return (
        <div className={`${baseClasses} ${typeClasses}`}>
            <span>{message}</span>
            <button onClick={onclose} className="ml-4 font-bold">X</button>
        </div>
    );
};

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, title, children, size = "sm" }) => {
    if (!isOpen) return null;
    const sizeClasses = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className={`bg-white rounded-2xl shadow-xl w-full ${sizeClasses[size]} transform transition-all duration-300`}>
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
            <div className="text-center">
                <p className="text-gray-600 mb-6">Are you sure you want to permanently delete this comment?</p>
                <div className="flex justify-center gap-4">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-lg">Yes, Delete</button>
                </div>
            </div>
        </Modal>
    );
};


const FeedbackReports = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    // Effect to auto-hide notification
    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchReports = async () => {
        setIsLoading(true);
        try {
            const data = await getAnonymousFeedback(sessionId);
            setReports(data);
        } catch (error) {
            setNotification({ message: "Failed to load feedback comments.", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [sessionId]);

    const handleDeleteClick = (commentId) => {
        setCommentToDelete(commentId);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (commentToDelete) {
            try {
                await deleteFeedbackComment(commentToDelete);
                setDeleteConfirmOpen(false);
                setCommentToDelete(null);
                fetchReports(); // Refresh the list
                setNotification({ message: "Comment deleted successfully!", type: 'success' });
            } catch (error) {
                setNotification({ message: "Failed to delete comment.", type: 'error' });
            }
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <button onClick={() => navigate('/staff/feedback')} className="mb-6 text-blue-600 hover:underline font-semibold flex items-center gap-1">
                &larr; Back to List
            </button>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Feedback Reports</h1>
                <p className="text-slate-500 mt-1">Anonymous comments for session #{sessionId}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-slate-200 text-slate-600">
                            <tr>
                                <th className="p-4 font-semibold">Sr No.</th>
                                <th className="p-4 font-semibold">Teaching Style</th>
                                <th className="p-4 font-semibold">Doubt Clearing</th>
                                <th className="p-4 font-semibold">Comment</th>
                                <th className="p-4 font-semibold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="5" className="text-center p-8 text-slate-500">Loading...</td></tr>
                            ) : reports.length === 0 ? (
                                <tr><td colSpan="5" className="text-center p-8 text-slate-500">No comments to display.</td></tr>
                            ) : (
                                reports.map((report) => (
                                    <tr key={report.feedbackId} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="p-4 text-slate-600">{report.serialNumber}</td>
                                        <td className="p-4 font-medium text-slate-800">{report.teachingStyleRating} / 5</td>
                                        <td className="p-4 font-medium text-slate-800">{report.doubtClearingRating} / 5</td>
                                        <td className="p-4 text-slate-600">{report.comments}</td>
                                        <td className="p-4 text-center">
                                            <button onClick={() => handleDeleteClick(report.feedbackId)} className="p-2 text-red-600 hover:bg-red-100 rounded-full">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
             <DeleteConfirmationModal
                isOpen={isDeleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            <Notification 
                message={notification.message} 
                type={notification.type} 
                onclose={() => setNotification({ message: '', type: '' })} 
            />
        </div>
    );
};

export default FeedbackReports;
