import api from './api';

// Fetches all timetable entries
export const getAllTimetableEntries = async () => {
    try {
        const response = await api.get('/admin/timetable');
        return response.data;
    } catch (error) {
        console.error("Error fetching timetable entries:", error);
        throw error;
    }
};

// Creates a new timetable entry
export const createTimetableEntry = async (entryData) => {
    try {
        const response = await api.post('/admin/timetable', entryData);
        return response.data;
    } catch (error) {
        console.error("Error creating timetable entry:", error);
        throw error;
    }
};

// Deletes a timetable entry by its ID
export const deleteTimetableEntry = async (entryId) => {
    try {
        await api.delete(`/admin/timetable/${entryId}`);
    } catch (error) {
        console.error(`Error deleting timetable entry ${entryId}:`, error);
        throw error;
    }
};

// We'll also need to fetch modules and instructors for the dropdowns
export const getAllModules = async () => {
    try {
        const response = await api.get('/admin/modules?size=200'); // Fetch all
        return response.data.content;
    } catch (error) {
        console.error("Error fetching modules:", error);
        throw error;
    }
};

export const getAllInstructors = async () => {
    try {
        const response = await api.get('/admin/instructors?size=200'); // Fetch all
        return response.data.content;
    } catch (error) {
        console.error("Error fetching instructors:", error);
        throw error;
    }
};


export const sendTimetableNotification = async (notificationData) => {
    try {
        // This function correctly calls the POST endpoint
        await api.post('/admin/timetable/notify', notificationData);
    } catch (error) {
        console.error("Error sending timetable notification:", error);
        throw error;
    }
};