import React from 'react';
import { Users, BookOpen, User } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        {
            label: "Total Students",
            value: "250",
            icon: <Users size={32} className="text-blue-600" />,
            bgColor: "bg-blue-100",
        },
        {
            label: "Active Modules",
            value: "12",
            icon: <BookOpen size={32} className="text-green-600" />,
            bgColor: "bg-green-100",
        },
        {
            label: "Total Instructors",
            value: "15",
            icon: <User size={32} className="text-indigo-600" />,
            bgColor: "bg-indigo-100",
        },
    ];

    return (
        <div className="p-6 sm:p-10 bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="mb-10 border-b border-gray-300 pb-4">
                <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-500 mt-1 text-lg">Overview of the system's key metrics</p>
            </header>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, index) => (
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
