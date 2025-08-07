import api from './api'; // Assuming you have a configured axios instance

// Fetch a paginated list of instructors
export const getAllInstructors = async (page = 0, size = 5) => {
    try {
        const response = await api.get(`/admin/instructors?page=${page}&size=${size}&sort=instructorId,desc`);
        return response.data;
    } catch (error) {
        console.error("Error fetching instructors:", error);
        throw error;
    }
};

// Fetch a single instructor by their ID
export const getInstructorById = async (id) => {
    try {
        const response = await api.get(`/admin/instructors/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching instructor with ID ${id}:`, error);
        throw error;
    }
};

// Create a new instructor
export const createInstructor = async (instructorData) => {
    try {
        const response = await api.post('/admin/instructors', instructorData);
        return response.data;
    } catch (error) {
        console.error("Error creating instructor:", error);
        throw error;
    }
};

// Update an existing instructor
export const updateInstructor = async (id, instructorData) => {
    try {
        const response = await api.put(`/admin/instructors/${id}`, instructorData);
        return response.data;
    } catch (error) {
        console.error(`Error updating instructor with ID ${id}:`, error);
        throw error;
    }
};

// Delete an instructor
export const deleteInstructor = async (id) => {
    try {
        await api.delete(`/admin/instructors/${id}`);
    } catch (error) {
        console.error(`Error deleting instructor with ID ${id}:`, error);
        throw error;
    }
};
