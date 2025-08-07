import api from './api';

// Fetches the schedule for a given date for the admin view
export const getScheduleByDate = async (dateString) => {
    try {
        // Calls the ADMIN endpoint for the timetable
        const response = await api.get(`/admin/timetable/by-date?date=${dateString}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching schedule for date:", error);
        throw error;
    }
};

// Gets the list of students for a specific module for the admin to mark attendance
export const getStudentsForAttendance = async (moduleId, page, size) => {
    try {
        const response = await api.get(`/admin/students/module/${moduleId}?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching students for attendance:", error);
        throw error;
    }
};

// Saves attendance in bulk from the admin page
export const saveBulkAttendance = async (attendanceData) => {
    try {
        const response = await api.post('/admin/attendance/bulk', attendanceData);
        return response.data;
    } catch (error) {
        console.error("Error saving bulk attendance:", error);
        throw error;
    }
};
