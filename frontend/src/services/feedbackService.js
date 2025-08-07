import api from './api'; // Assuming a central api.js for Axios configuration

/**
 * Service for handling student-facing feedback operations.
 */

/**
 * Fetches the list of feedback sessions that are pending for the logged-in student.
 * @returns {Promise<Array>} A promise that resolves to a list of pending feedback sessions.
 * @throws {Error} Throws an error if the API call fails.
 */
export const getPendingFeedbackTasks = async () => {
    try {
        // This endpoint correctly fetches only the feedback sessions the student has not yet completed.
        const response = await api.get('student/dashboard/pending-feedback');
        return response.data;
    } catch (error) {
        console.error("Error fetching pending feedback tasks:", error);
        throw error;
    }
};

/**
 * Submits a student's feedback for a specific session.
 * @param {Object} feedbackData - The feedback data to be submitted.
 * @param {number} feedbackData.sessionId - The ID of the feedback session.
 * @param {number} feedbackData.teachingStyleRating - The rating for teaching style.
 * @param {number} feedbackData.doubtClearingRating - The rating for doubt clearing.
 * @param {string} feedbackData.comments - Additional comments.
 * @returns {Promise<void>} A promise that resolves when the submission is successful.
 * @throws {Error} Throws an error if the API call fails.
 */
export const submitFeedback = async (feedbackData) => {
    try {
        await api.post('student/feedback/submit', feedbackData);
    } catch (error) {
        console.error("Error submitting feedback:", error);
        throw error;
    }
};