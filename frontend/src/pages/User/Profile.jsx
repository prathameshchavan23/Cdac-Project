import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Globe, UserCheck, BookOpen, Hash, Edit } from 'lucide-react';// --- CHANGE: Import our new service function ---
import { getMyProfile } from '../../services/profileService';

// --- Reusable Profile Detail Component (No changes needed here) ---
const DetailItem = ({ icon, label, value }) => (
    <div>
        <div className="flex items-center text-sm text-gray-500 mb-1">
            {icon}
            <span className="ml-2">{label}</span>
        </div>
        <p className="text-base font-semibold text-gray-800">{value || 'N/A'}</p>
    </div>
);

// --- Main Profile Page Component ---
const Profile = () => {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- CHANGE: This function now calls our real backend API ---
    const fetchStudentData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getMyProfile();
            setStudentData(data);
        } catch (err) {
            setError("Failed to fetch student data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600 mx-auto"></div>
                    <h2 className="text-2xl font-semibold text-gray-700 mt-4">Loading Profile...</h2>
                    <p className="text-gray-500">Please wait while we fetch your details.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-red-600">An Error Occurred</h2>
                    <p className="mt-2 text-gray-600">{error}</p>
                    <button 
                        onClick={fetchStudentData}
                        className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }
    
    if (!studentData) {
        return null;
    }

    // --- CHANGE: The JSX below now uses fields from our StudentResponse DTO ---
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden mb-8">
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative" />
                    <div className="relative px-8 pb-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-16 mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                {/* Placeholder image as we don't have one from the backend */}
                                <User className="w-full h-full text-gray-400 p-4" />
                            </div>
                            <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left flex-grow">
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {studentData.firstName} {studentData.lastName}
                                </h2>
                                <p className="text-gray-600 text-sm font-medium mt-1">
                                    {studentData.departmentName}
                                </p>
                            </div>
                            <button className="mt-4 sm:mt-0 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-200 transition flex items-center gap-2">
                                <Edit size={16} /> Edit Profile
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-t border-gray-200 pt-6">
                            <DetailItem icon={<BookOpen size={16} className="text-gray-400"/>} label="Department" value={studentData.departmentName} />
                            <DetailItem icon={<Hash size={16} className="text-gray-400"/>} label="PRN Number" value={studentData.prn} />
                            <DetailItem icon={<UserCheck size={16} className="text-gray-400"/>} label="Status" value="Active" />
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-8">
                    {/* Personal Details */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800">Personal Details</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                            <DetailItem icon={<User size={16} className="text-gray-400"/>} label="First Name" value={studentData.firstName} />
                            <DetailItem icon={<User size={16} className="text-gray-400"/>} label="Last Name" value={studentData.lastName} />
                            <DetailItem icon={<Calendar size={16} className="text-gray-400"/>} label="Date of Birth" value={studentData.dateOfBirth} />
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-8">
                            <DetailItem icon={<Mail size={16} className="text-gray-400"/>} label="Email Address" value={studentData.email} />
                            <DetailItem icon={<Phone size={16} className="text-gray-400"/>} label="Mobile Number" value={studentData.phoneNumber} />
                            <DetailItem icon={<MapPin size={16} className="text-gray-400"/>} label="Postal Address" value={studentData.address} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;