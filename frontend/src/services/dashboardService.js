import api from './api'; // Import our central, pre-configured Axios instance

/**
 * Fetches the primary dashboard statistics (total courses, attendance) for the student.
 * @returns {Promise<Object>} A promise that resolves to the stats data.
 */
export const getStudentDashboardStats = async () => {
    try {
        const response = await api.get('/student/dashboard/stats');
        return response.data;
    } catch (error) {
        console.error("Error fetching student dashboard stats:", error);
        throw error;
    }
};

/**
 * Fetches the list of pending feedback tasks for the student.
 * @returns {Promise<Array>} A promise that resolves to the list of pending feedback sessions.
 */
export const getPendingFeedbackTasks = async () => {
    try {
        const response = await api.get('/student/dashboard/pending-feedback');
        return response.data;
    } catch (error) {
        console.error("Error fetching pending feedback tasks:", error);
        throw error;
    }
};