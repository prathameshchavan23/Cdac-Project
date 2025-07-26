import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Globe, UserCheck, BookOpen, Hash, Edit } from 'lucide-react';

// --- Mock Data (Simulates a backend API response) ---
const mockStudentData = {
    name: "Rohan Sharma",
    course: "PG-DAC (Post Graduate Diploma in Advanced Computing)",
    year: "2024",
    prn: "240340120011",
    profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=faces",
    personal: {
        firstName: "Rohan",
        lastName: "Sharma",
        gender: "Male",
        dateOfBirth: "15 May, 2002",
        country: "India",
        region: "Maharashtra",
    },
    contact: {
        email: "rohan.sharma@example.com",
        mobile: "+91 98765 43210",
        alternateMobile: "+91 98765 43211",
        postalAddress: {
            line1: "123 Pine Street, Apt 4B",
            line2: "Andheri West",
            line3: "Mumbai, 400058",
        },
    },
};

// --- Reusable Profile Detail Component ---
const DetailItem = ({ icon, label, value }) => (
    <div>
        <div className="flex items-center text-sm text-gray-500 mb-1">
            {icon}
            <span className="ml-2">{label}</span>
        </div>
        <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
);

// --- Main Profile Page Component ---
const Profile = () => {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Simulate fetching data from a backend
    const fetchStudentData = () => {
        setLoading(true);
        setError(null);
        setTimeout(() => {
            // Simulate a successful fetch
            if (Math.random() > 0.1) { // 90% chance of success
                setStudentData(mockStudentData);
            } else {
                // Simulate a fetch error
                setError("Failed to fetch student data. Please try again.");
            }
            setLoading(false);
        }, 1500);
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
                    <p className="text-gray-500">Please wait while we fetch the student details.</p>
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
        return null; // Should not happen if loading and error are handled, but good practice
    }


    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden mb-8">
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative" />
                    <div className="relative px-8 pb-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-16 mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                <img
                                    src={studentData.profileImageUrl}
                                    alt="Student Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left flex-grow">
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {studentData.name}
                                </h2>
                                <p className="text-gray-600 text-sm font-medium mt-1">
                                    {studentData.course}
                                </p>
                            </div>
                            <button className="mt-4 sm:mt-0 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-200 transition flex items-center gap-2">
                                <Edit size={16} /> Edit Profile
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-t border-gray-200 pt-6">
                            <DetailItem icon={<BookOpen size={16} className="text-gray-400"/>} label="Current Year" value={studentData.year} />
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
                            <DetailItem icon={<User size={16} className="text-gray-400"/>} label="First Name" value={studentData.personal.firstName} />
                            <DetailItem icon={<User size={16} className="text-gray-400"/>} label="Last Name" value={studentData.personal.lastName} />
                            <DetailItem icon={<UserCheck size={16} className="text-gray-400"/>} label="Gender" value={studentData.personal.gender} />
                            <DetailItem icon={<Calendar size={16} className="text-gray-400"/>} label="Date of Birth" value={studentData.personal.dateOfBirth} />
                            <DetailItem icon={<Globe size={16} className="text-gray-400"/>} label="Country" value={studentData.personal.country} />
                            <DetailItem icon={<MapPin size={16} className="text-gray-400"/>} label="Region" value={studentData.personal.region} />
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-8">
                            <DetailItem icon={<Mail size={16} className="text-gray-400"/>} label="Email Address" value={studentData.contact.email} />
                            <DetailItem icon={<Phone size={16} className="text-gray-400"/>} label="Mobile Number" value={studentData.contact.mobile} />
                            <DetailItem icon={<Phone size={16} className="text-gray-400"/>} label="Alternate Mobile" value={studentData.contact.alternateMobile} />
                            <div>
                                <div className="flex items-center text-sm text-gray-500 mb-1">
                                    <MapPin size={16} className="text-gray-400"/>
                                    <span className="ml-2">Postal Address</span>
                                </div>
                                <div className="text-base font-semibold text-gray-800 space-y-1">
                                    <p>{studentData.contact.postalAddress.line1}</p>
                                    <p>{studentData.contact.postalAddress.line2}</p>
                                    <p>{studentData.contact.postalAddress.line3}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
