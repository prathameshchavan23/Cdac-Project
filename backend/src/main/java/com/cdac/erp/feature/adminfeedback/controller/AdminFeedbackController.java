package com.cdac.erp.feature.adminfeedback.controller;

import com.cdac.erp.feature.adminfeedback.dto.AdminFeedbackInstructorResponse;
import com.cdac.erp.feature.adminfeedback.dto.AnonymousFeedbackResponse;
import com.cdac.erp.feature.adminfeedback.dto.FeedbackAveragesResponse;
import com.cdac.erp.feature.adminfeedback.dto.FeedbackSessionRequest;
import com.cdac.erp.feature.adminfeedback.dto.FeedbackStatsResponse;
import com.cdac.erp.feature.adminfeedback.service.IAdminFeedbackService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/feedback")
public class AdminFeedbackController {

    @Autowired
    private IAdminFeedbackService adminFeedbackService;

    @PostMapping("/sessions")
    public ResponseEntity<Void> createFeedbackSession(@Valid @RequestBody FeedbackSessionRequest request) {
        adminFeedbackService.createFeedbackSession(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/averages")
    public ResponseEntity<List<FeedbackAveragesResponse>> getFeedbackAverages() {
        List<FeedbackAveragesResponse> averages = adminFeedbackService.getFeedbackAverages();
        return ResponseEntity.ok(averages);
    }

    @GetMapping("/instructors")
    public ResponseEntity<List<AdminFeedbackInstructorResponse>> getAllInstructorsForAdminFeedback() {
        List<AdminFeedbackInstructorResponse> instructors = adminFeedbackService.getAllInstructorsForAdminFeedbackView();
        return ResponseEntity.ok(instructors);
    }

    @GetMapping("/sessions/{sessionId}/stats")
    public ResponseEntity<FeedbackStatsResponse> getFeedbackStats(@PathVariable Integer sessionId) {
        FeedbackStatsResponse stats = adminFeedbackService.getFeedbackStats(sessionId);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/sessions/{sessionId}/anonymous")
    public ResponseEntity<List<AnonymousFeedbackResponse>> getAnonymousFeedback(@PathVariable Integer sessionId) {
        List<AnonymousFeedbackResponse> feedbackList = adminFeedbackService.getAnonymousFeedbackForSession(sessionId);
        return ResponseEntity.ok(feedbackList);
    }

    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Integer feedbackId) {
        adminFeedbackService.deleteFeedback(feedbackId);
        return ResponseEntity.noContent().build();
    }
}