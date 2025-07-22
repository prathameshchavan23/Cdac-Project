import React from 'react';
import FormHeader from './FormHeader';

const LoginPage = ({ role, onBack }) => {
    return (
        <div className="w-full max-w-md mx-auto p-8">
            <FormHeader />
            <div className="mt-8">
                <h1 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h1>
                <p className="text-center text-gray-500 mt-2 mb-8">
                    Please sign in as a <span className="font-semibold capitalize">{role}</span>.
                </p>
                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="example@email.com" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="at least 8 characters" 
                        />
                    </div>
                    <div className="text-right">
                        <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                    </div>
                    <div>
                        <button 
                            type="submit" 
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don't have an account? <a href="#" className="font-medium text-blue-600 hover:underline">Sign up</a>
                    </p>
                    <button onClick={onBack} className="mt-4 text-sm text-gray-500 hover:underline">
                        &larr; Back to role selection
                    </button>
                </div>
            </div>
        </div>
    );
};


export default LoginPage;