package com.cdac.erp.feature.adminfeedback.service;

import com.cdac.erp.feature.adminfeedback.dto.AdminFeedbackInstructorResponse;
import com.cdac.erp.feature.adminfeedback.dto.AnonymousFeedbackResponse;
import com.cdac.erp.feature.adminfeedback.dto.FeedbackAveragesResponse;
import com.cdac.erp.feature.adminfeedback.dto.FeedbackSessionRequest;
import com.cdac.erp.feature.adminfeedback.dto.FeedbackSessionResponse;
import com.cdac.erp.feature.adminfeedback.dto.FeedbackStatsResponse;
import java.util.List;

public interface IAdminFeedbackService {
    
    /**
     * Retrieves a list of all feedback sessions.
     */
    List<FeedbackSessionResponse> getAllFeedbackSessions();

    /**
     * Closes an active feedback session, preventing new submissions.
     */
    void closeFeedbackSession(Integer sessionId);

    /**
     * Deletes an entire feedback session and all associated student responses.
     */
    void deleteFeedbackSession(Integer sessionId);


    /**
     * Deletes a single student's feedback comment.
     */
    void deleteFeedback(Integer feedbackId);


    void createFeedbackSession(FeedbackSessionRequest request);
    
//    List<FeedbackAveragesResponse> getFeedbackAverages();
    
    List<AnonymousFeedbackResponse> getAnonymousFeedbackForSession(Integer sessionId);
    
//    List<AdminFeedbackInstructorResponse> getAllInstructorsForAdminFeedbackView();
    
    FeedbackStatsResponse getFeedbackStats(Integer sessionId);
}
