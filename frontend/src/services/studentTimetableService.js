import api from './api';

/**
 * Fetches the upcoming 7-day timetable for the logged-in student.
 */
export const getUpcomingTimetable = async () => {
    try {
        const response = await api.get('/student/timetable/upcoming');
        return response.data;
    } catch (error) {
        console.error("Error fetching upcoming timetable:", error);
        throw error;
    }
};
