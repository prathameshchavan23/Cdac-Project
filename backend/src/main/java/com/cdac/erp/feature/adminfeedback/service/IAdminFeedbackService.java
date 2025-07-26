package com.cdac.erp.feature.adminfeedback.service;

import com.cdac.erp.feature.adminfeedback.dto.AdminFeedbackInstructorResponse;
import com.cdac.erp.feature.adminfeedback.dto.AnonymousFeedbackResponse;
import com.cdac.erp.feature.adminfeedback.dto.FeedbackAveragesResponse;
import com.cdac.erp.feature.adminfeedback.dto.FeedbackSessionRequest;
import com.cdac.erp.feature.adminfeedback.dto.FeedbackStatsResponse;
import java.util.List;

public interface IAdminFeedbackService {
    void createFeedbackSession(FeedbackSessionRequest request);
    List<FeedbackAveragesResponse> getFeedbackAverages();
    List<AnonymousFeedbackResponse> getAnonymousFeedbackForSession(Integer sessionId);
    void deleteFeedback(Integer feedbackId);
    List<AdminFeedbackInstructorResponse> getAllInstructorsForAdminFeedbackView();
    FeedbackStatsResponse getFeedbackStats(Integer sessionId);
}