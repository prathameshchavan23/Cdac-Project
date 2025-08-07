import api from './api'; // Assuming a central api.js for Axios configuration

/**
 * Fetches the profile details for the currently authenticated student.
 * @returns {Promise<Object>} A promise that resolves to the student's profile data.
 * @throws {Error} Throws an error if the API call fails.
 */
export const getMyProfile = async () => {
    try {
        const response = await api.get('/student/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching student profile:', error);
        throw error;
    }
};