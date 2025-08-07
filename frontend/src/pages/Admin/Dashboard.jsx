import React, { useState, useEffect } from 'react';
import { Users, BookOpen, User } from 'lucide-react';
// --- CHANGE: Import our new service function ---
import { getAdminDashboardStats } from '../../services/adminDashboardService';

const Dashboard = () => {
    // --- CHANGE: State for live data, loading, and errors ---
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- CHANGE: Fetch data from the backend when the component loads ---
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await getAdminDashboardStats();
                setStats(data);
            } catch (err) {
                setError("Failed to load dashboard statistics.");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // --- CHANGE: Create the stats array dynamically from the fetched data ---
    const statsCards = stats ? [
        {
            label: "Total Students",
            value: stats.totalStudents,
            icon: <Users size={32} className="text-blue-600" />,
            bgColor: "bg-blue-100",
        },
        {
            label: "Active Modules",
            value: stats.totalModules,
            icon: <BookOpen size={32} className="text-green-600" />,
            bgColor: "bg-green-100",
        },
        {
            label: "Total Instructors",
            value: stats.totalInstructors,
            icon: <User size={32} className="text-indigo-600" />,
            bgColor: "bg-indigo-100",
        },
    ] : [];

    if (loading) {
        return <div className="text-center p-10">Loading Statistics...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6 sm:p-10 bg-gray-50 min-h-screen">
            <header className="mb-10 border-b border-gray-300 pb-4">
                <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-500 mt-1 text-lg">Overview of the system's key metrics</p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {statsCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">
                                    {stat.label}
                                </p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">
                                    {stat.value}
                                </p>
                            </div>
                            <div
                                className={`p-3 rounded-full ${stat.bgColor} transition-transform duration-300 hover:scale-110`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;