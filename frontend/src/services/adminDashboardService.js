import api from './api'; // Assuming you have a central api.js for Axios configuration

/**
 * Fetches the key statistics for the admin dashboard.
 * @returns {Promise<Object>} A promise that resolves to the dashboard stats data.
 * @throws {Error} Throws an error if the API call fails.
 */
export const getAdminDashboardStats = async () => {
    try {
        const response = await api.get('/admin/dashboard/stats');
        return response.data;
    } catch (error) {
        console.error("Error fetching admin dashboard stats:", error);
        throw error;
    }
};