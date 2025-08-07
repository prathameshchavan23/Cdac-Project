import api from './api'; // Your configured axios instance

// Fetches all admins
export const getAllAdmins = async () => {
    try {
        const response = await api.get('/admin/admins');
        return response.data;
    } catch (error) {
        console.error("Error fetching admins:", error);
        throw error;
    }
};

// Fetches a single admin by ID
export const getAdminById = async (adminId) => {
    try {
        const response = await api.get(`/admin/admins/${adminId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching admin ${adminId}:`, error);
        throw error;
    }
};

// Creates a new admin
export const createAdmin = async (adminData) => {
    try {
        const response = await api.post('/admin/admins/register/admin', adminData);
        return response.data;
    } catch (error) {
        console.error("Error creating admin:", error);
        throw error;
    }
};

// Updates an existing admin
export const updateAdmin = async (adminId, adminData) => {
    try {
        const response = await api.put(`/admin/admins/${adminId}`, adminData);
        return response.data;
    } catch (error) {
        console.error(`Error updating admin ${adminId}:`, error);
        throw error;
    }
};

// Deletes an admin by ID
export const deleteAdmin = async (adminId) => {
    try {
        await api.delete(`/admin/admins/${adminId}`);
    } catch (error) {
        console.error(`Error deleting admin ${adminId}:`, error);
        throw error;
    }
};
