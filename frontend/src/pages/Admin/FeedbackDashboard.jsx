import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getFeedbackStats } from '../../services/adminfeedbackService';
import { X } from 'lucide-react';

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

const FeedbackDashboard = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });

    // Effect to auto-hide notification
    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getFeedbackStats(sessionId);
                setStats(data);
            } catch (error) {
                setNotification({ message: "Failed to load feedback stats.", type: 'error' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, [sessionId]);

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Loading Dashboard...</div>;
    }
    
    if (!stats) {
        return (
            <div className="p-8">
                 <button onClick={() => navigate('/staff/feedback')} className="mb-6 text-blue-600 hover:underline font-semibold flex items-center gap-1">
                    &larr; Back to List
                </button>
                <p className="text-center text-red-500">Could not load data for this feedback session.</p>
                <Notification 
                    message={notification.message} 
                    type={notification.type} 
                    onclose={() => setNotification({ message: '', type: '' })} 
                />
            </div>
        );
    }

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <button onClick={() => navigate('/staff/feedback')} className="mb-6 text-blue-600 hover:underline font-semibold flex items-center gap-1">
                &larr; Back to List
            </button>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Feedback Dashboard</h1>
                <p className="text-slate-500 mt-1">
                    Summary for feedback session #{sessionId}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-blue-100 border rounded-xl text-center">
                    <p className="text-lg text-blue-800">Average Rating</p>
                    <p className="text-5xl font-bold text-blue-900 my-2">{stats.averageRating.toFixed(1)} / 5.0</p>
                </div>
                <div className="p-6 bg-green-100 border rounded-xl text-center">
                    <p className="text-lg text-green-800">Total Submissions</p>
                    <p className="text-5xl font-bold text-green-900 my-2">{stats.totalSubmissions}</p>
                </div>
                <div className="p-6 bg-red-100 border rounded-xl text-center">
                    <p className="text-lg text-red-800">Pending</p>
                    <p className="text-5xl font-bold text-red-900 my-2">{stats.pendingSubmissions}</p>
                </div>
            </div>
            <div className="flex justify-end">
                <Link to={`/staff/feedback/reports/${sessionId}`} className="bg-gray-800 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-gray-900">
                    Check Comments
                </Link>
            </div>
            <Notification 
                message={notification.message} 
                type={notification.type} 
                onclose={() => setNotification({ message: '', type: '' })} 
            />
        </div>
    );
};

export default FeedbackDashboard;
