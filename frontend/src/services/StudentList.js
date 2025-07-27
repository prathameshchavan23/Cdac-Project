import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Import our pre-configured Axios instance

/**
 * A React component that fetches and displays a list of students from a protected admin endpoint.
 */
const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');

    // useEffect hook runs once when the component mounts
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Make a GET request to the protected endpoint.
                // The Axios interceptor in api.js will automatically add the JWT header.
                const response = await api.get('/admin/students');

                // Assuming the response is paginated, we get the content array
                setStudents(response.data.content);
            } catch (error) {
                // If the request fails (e.g., 403 Forbidden), set an error message
                console.error("Failed to fetch students:", error);
                setError('You do not have permission to view this data.');
            }
        };

        fetchStudents();
    }, []); 

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div>
            <h1>Student List</h1>
            <ul>
                {students.map(student => (
                    <li key={student.prn}>{student.firstName} {student.lastName}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;
