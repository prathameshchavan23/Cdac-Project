import api from './api'; // Assuming you have a central api.js for Axios configuration
import { format } from 'date-fns';

/**
 * Fetches the student's attendance records for a specific date.
 * @param {Date} date - The date for which to fetch attendance.
 * @returns {Promise<Array>} A promise that resolves to a list of attendance records.
 * @throws {Error} Throws an error if the API call fails.
 */
export const getAttendanceByDate = async (date) => {
    // Format the date to YYYY-MM-DD for the API request parameter
    const formattedDate = format(date, 'yyyy-MM-dd');
    try {
        const response = await api.get(`/student/attendance/by-date?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching daily attendance:", error);
        throw error;
    }
};