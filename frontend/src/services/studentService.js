import api from './api';

export const getAllStudents = async (page = 0, size = 10, searchTerm = '', departmentId = '') => {
    try {
        // We will implement server-side search/filter later. For now, we fetch all.
        const response = await api.get(`/admin/students?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
};

export const createStudent = async (studentData) => {
    try {
        console.log("Submitting student:", studentData);
        const response = await api.post('/admin/students', studentData);
        return response.data;
    } catch (error) {
        console.error("Error creating student:", error);
        throw error;
    }
};

export const updateStudent = async (prn, studentData) => {
    try {
        const response = await api.put(`/admin/students/${prn}`, studentData);
        return response.data;
    } catch (error) {
        console.error(`Error updating student ${prn}:`, error);
        throw error;
    }
};

export const deleteStudent = async (prn) => {
    try {
        const response = await api.delete(`/admin/students/${prn}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting student ${prn}:`, error);
        throw error;
    }
};

// We also need to fetch departments for the form dropdown
export const getAllDepartments = async () => {
    try {
        const response = await api.get('/departments'); // Assuming this is the correct endpoint
        return response.data;
    } catch (error) {
        console.error("Error fetching departments:", error);
        throw error;
    }
};