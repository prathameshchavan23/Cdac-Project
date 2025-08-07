import React, { createContext, useState, useContext } from 'react';

// Create the context
export const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Attempt to get user info from localStorage on initial load
        const storedUser = localStorage.getItem('user');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            return null;
        }
    });

    // This would be called by your login component
    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    // This would be called by your logout component
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook for easy access to the context
export const useAuth = () => {
    return useContext(AuthContext);
};
