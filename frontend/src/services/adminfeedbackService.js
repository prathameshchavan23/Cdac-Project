import api from './api';

// Get all feedback sessions for the main list
export const getAllFeedbackSessions = async () => {
    const response = await api.get('/admin/feedback/sessions');
    return response.data;
};

// Create a new feedback session
export const createFeedbackSession = async (sessionData) => {
    return await api.post('/admin/feedback/sessions', sessionData);
};

// Close an active feedback session
export const closeFeedbackSession = async (sessionId) => {
    return await api.put(`/admin/feedback/sessions/${sessionId}/close`);
};

// Delete an entire feedback session
export const deleteFeedbackSession = async (sessionId) => {
    return await api.delete(`/admin/feedback/sessions/${sessionId}`);
};

// Get stats for the dashboard view
export const getFeedbackStats = async (sessionId) => {
    const response = await api.get(`/admin/feedback/sessions/${sessionId}/stats`);
    return response.data;
};

// Get anonymous comments for the reports view
export const getAnonymousFeedback = async (sessionId) => {
    const response = await api.get(`/admin/feedback/sessions/${sessionId}/anonymous`);
    return response.data;
};

// Delete a single student's comment
export const deleteFeedbackComment = async (commentId) => {
    return await api.delete(`/admin/feedback/comment/${commentId}`);
};
