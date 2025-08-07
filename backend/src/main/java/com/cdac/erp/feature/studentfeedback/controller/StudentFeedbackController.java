package com.cdac.erp.feature.studentfeedback.controller;

import com.cdac.erp.feature.studentfeedback.dto.ActiveSessionResponse;
import com.cdac.erp.feature.studentfeedback.dto.FeedbackRequest;
import com.cdac.erp.feature.studentfeedback.service.IStudentFeedbackService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/feedback")
public class StudentFeedbackController {

    @Autowired
    private IStudentFeedbackService studentFeedbackService;

    @PostMapping("/submit")
    public ResponseEntity<Void> submitFeedback(@Valid @RequestBody FeedbackRequest request, Authentication authentication) {
        String studentPrn = authentication.getName();
        studentFeedbackService.submitFeedback(studentPrn, request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

//    @GetMapping("/sessions/active")
//    public ResponseEntity<List<ActiveSessionResponse>> getActiveSessions(Authentication authentication) {
//        List<ActiveSessionResponse> sessions = studentFeedbackService.getActiveFeedbackSessions();
//        return ResponseEntity.ok(sessions);
//    }
}