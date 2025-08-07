import api from './api';

// Fetches all modules for the dropdown
export const getAllModules = async () => {
    try {
        const response = await api.get('/admin/modules?size=200');
        return response.data.content;
    } catch (error) {
        console.error("Error fetching modules:", error);
        throw error;
    }
};

// --- FIX: Fetch all students for the marks sheet (up to a limit of 200) ---
export const getMarksSheetForExam = async (examId) => {
    try {
        const response = await api.get(`/admin/scores/exam/${examId}/marks-sheet?size=200`);
        return response.data;
    } catch (error) {
        console.error("Error fetching marks sheet:", error);
        throw error;
    }
};

// --- FIX: Send the examId along with the scores in the request body ---
export const saveBulkScores = async (examId, scores) => {
    try {
        const payload = {
            examId: examId,
            scores: scores
        };
        const response = await api.post(`/admin/scores/bulk`, payload);
        return response.data;
    } catch (error) {
        console.error("Error saving bulk scores:", error);
        throw error;
    }
};

// Fetches all past score records
export const getAllScores = async () => {
    try {
        const response = await api.get('/admin/scores');
        return response.data;
    } catch (error) {
        console.error("Error fetching all scores:", error);
        throw error;
    }
};

// Updates a single score record
export const updateScore = async (scoreId, marks) => {
    try {
        const response = await api.put(`/admin/scores/${scoreId}`, marks);
        return response.data;
    } catch (error) {
        console.error(`Error updating score ${scoreId}:`, error);
        throw error;
    }
};

// Creates a new exam
export const createExam = async (examData) => {
    try {
        const response = await api.post('/admin/exams', examData);
        return response.data;
    } catch (error) {
        console.error("Error creating exam:", error);
        throw error;
    }
};

// Fetches exams for a specific module
export const getExamsByModule = async (moduleId) => {
    try {
        const response = await api.get(`/admin/exams/module/${moduleId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching exams by module:", error);
        throw error;
    }
};

// Fetches a single score for a student in an exam
export const getScoreForStudent = async (examId, studentPrn) => {
    try {
        const response = await api.get(`/admin/scores/exam/${examId}/student/${studentPrn}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error("Error fetching score for student:", error);
        throw error;
    }
};

// Fetches paginated scores for a given exam
export const getScoresForExam = async (examId, page = 0, size = 10) => {
    try {
        const response = await api.get(`/admin/scores/exam/${examId}?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching scores for exam:", error);
        throw error;
    }
};
