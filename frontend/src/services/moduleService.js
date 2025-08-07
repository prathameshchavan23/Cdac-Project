import api from './api'; // Assuming you have a configured axios instance

// Fetches a paginated list of modules
export const getAllModules = async (page = 0, size = 5) => {
    try {
        const response = await api.get(`/admin/modules?page=${page}&size=${size}&sort=moduleId,asc`);
        return response.data;
    } catch (error) {
        console.error("Error fetching modules:", error);
        throw error;
    }
};

// Creates a new module
export const createModule = async (moduleData) => {
    try {
        const response = await api.post('/admin/modules', moduleData);
        return response.data;
    } catch (error) {
        console.error("Error creating module:", error);
        throw error;
    }
};

// Updates an existing module
export const updateModule = async (moduleId, moduleData) => {
    try {
        const response = await api.put(`/admin/modules/${moduleId}`, moduleData);
        return response.data;
    } catch (error) {
        console.error(`Error updating module ${moduleId}:`, error);
        throw error;
    }
};

// Deletes a module by its ID
export const deleteModule = async (moduleId) => {
    try {
        await api.delete(`/admin/modules/${moduleId}`);
    } catch (error) {
        console.error(`Error deleting module ${moduleId}:`, error);
        throw error;
    }
};
