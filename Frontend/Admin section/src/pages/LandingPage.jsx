import React from 'react';
import FormHeader from './FormHeader';

const LandingPage = ({ onSelectRole }) => {
    return (
        <div className="w-full max-w-md mx-auto p-8">
            <FormHeader />
            <div className="mt-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Hello!</h1>
                <p className="text-gray-500 mt-2 mb-8">Choose your login portal</p>
                <div className="space-y-4">
                    {/* Student Login Button */}
                    <button 
                        onClick={() => onSelectRole('student')}
                        className="group w-full text-left p-4 bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-all duration-200"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="font-bold text-lg">Student</h2>
                                <p className="text-sm text-blue-200">Access the students' portal here.</p>
                            </div>
                            <span className="transform transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                        </div>
                    </button>
                    {/* Staff Login Button */}
                    <button 
                        onClick={() => onSelectRole('staff')}
                        className="group w-full text-left p-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="font-bold text-lg">Staff</h2>
                                <p className="text-sm text-gray-500">Exclusive to staff members only.</p>
                            </div>
                            <span className="transform transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default LandingPage;