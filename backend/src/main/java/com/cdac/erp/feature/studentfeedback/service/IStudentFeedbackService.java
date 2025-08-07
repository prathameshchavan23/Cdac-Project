package com.cdac.erp.feature.studentfeedback.service;

import com.cdac.erp.feature.studentfeedback.dto.ActiveSessionResponse;
import com.cdac.erp.feature.studentfeedback.dto.FeedbackRequest;
import java.util.List;

/**
 * Service interface for student-facing feedback operations.
 */
public interface IStudentFeedbackService {

    /**
     * Submits feedback from a student for a specific feedback session.
     * @param studentPrn The PRN of the student submitting feedback.
     * @param request The feedback details.
     */
    void submitFeedback(String studentPrn, FeedbackRequest request);

//    /**
//     * Retrieves a list of all currently active feedback sessions available for students.
//     * @return A list of active feedback sessions.
//     */
//    List<ActiveSessionResponse> getActiveFeedbackSessions();
}