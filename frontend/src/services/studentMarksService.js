import api from './api'; // Import our central, pre-configured Axios instance

/**
 * Fetches all marks/scores for the currently logged-in student.
 * @returns {Promise<Array>} A promise that resolves to a list of the student's marks.
 * @throws {Error} Throws an error if the API call fails.
 */
export const getMyMarks = async () => {
    try {
        const response = await api.get('/student/my-marks');
        return response.data;
    } catch (error) {
        console.error('Error fetching student marks:', error);
        throw error;
    }
};