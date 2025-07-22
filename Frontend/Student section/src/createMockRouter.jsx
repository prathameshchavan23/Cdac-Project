import React, { useState, useEffect } from 'react';

// --- Mock react-router-dom for demonstration (FIXED) ---
// This version uses a factory function to create a closure,
// which avoids 'this' context issues that caused the crash.
const createMockRouter = () => {
    let currentPath = '/feedback';
    const listeners = new Set();

    const navigate = (path) => {
        currentPath = path;
        listeners.forEach(listener => listener(path));
    };

    const useLocation = () => {
        const [path, setPath] = useState(currentPath);
        useEffect(() => {
            const handler = (newPath) => setPath(newPath);
            listeners.add(handler);
            // This effect should only run once to set up the listener
            return () => listeners.delete(handler);
        }, []); // Empty dependency array ensures it runs only on mount
        return { pathname: path };
    };

    const Link = ({ to, children, className }) => {
        const handleClick = (e) => {
            e.preventDefault();
            navigate(to); // Uses navigate from the closure, 'this' is not needed
        };
        return <a href={to} onClick={handleClick} className={className}>{children}</a>;
    };
    
    return { navigate, useLocation, Link };
};

const { Link, useLocation, navigate } = createMockRouter();
export { Link, useLocation, navigate };
// --- End of Mock ---

