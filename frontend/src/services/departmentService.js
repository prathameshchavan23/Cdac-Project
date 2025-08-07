import api from './api'; // Assuming you have a configured axios instance

// Fetches all departments for the dropdown menu
export const getAllDepartments = async () => {
    try {
        const response = await api.get('/departments');
        return response.data;
    } catch (error) {
        console.error("Error fetching departments:", error);
        throw error;
    }
};
