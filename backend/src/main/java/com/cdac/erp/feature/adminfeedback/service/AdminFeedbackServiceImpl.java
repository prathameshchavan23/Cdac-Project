package com.cdac.erp.feature.adminfeedback.service;

import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Feedback;
import com.cdac.erp.core.model.FeedbackSession;
import com.cdac.erp.core.model.Instructor;
import com.cdac.erp.core.model.CourseModule;
import com.cdac.erp.core.repository.*;
import com.cdac.erp.feature.adminfeedback.dto.*;
import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminFeedbackServiceImpl implements IAdminFeedbackService {

    @Autowired private FeedbackRepository feedbackRepository;
    @Autowired private InstructorRepository instructorRepository;
    @Autowired private CourseModuleRepository moduleRepository;
    @Autowired private FeedbackSessionRepository feedbackSessionRepository;
    @Autowired private StudentRepository studentRepository;

    @Override
    public List<FeedbackSessionResponse> getAllFeedbackSessions() {
        return feedbackSessionRepository.findAll().stream()
                .map(session -> new FeedbackSessionResponse(
                        session.getSessionId(),
                        session.getModule().getModuleName(),
                        session.getInstructor().getFirstName() + " " + session.getInstructor().getLastName(),
                        session.isActive()
                ))
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional
    public void closeFeedbackSession(Integer sessionId) {
        FeedbackSession session = feedbackSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback session not found with id: " + sessionId));
        
        session.setActive(false);
        feedbackSessionRepository.save(session);
    }
    
    @Override
    @Transactional
    public void deleteFeedbackSession(Integer sessionId) {
        if (!feedbackSessionRepository.existsById(sessionId)) {
            throw new ResourceNotFoundException("Feedback session not found with id: " + sessionId);
        }
        // First, delete all child feedback comments to avoid constraint violations
        feedbackRepository.deleteByFeedbackSession_SessionId(sessionId);
        // Then, delete the parent session
        feedbackSessionRepository.deleteById(sessionId);
    }

    @Override
    public void createFeedbackSession(FeedbackSessionRequest request) {
    	
        CourseModule module = moduleRepository.findById(request.getModuleId())
                .orElseThrow(() -> new ResourceNotFoundException("Module not found"));
        Instructor instructor = instructorRepository.findById(request.getInstructorId())
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found"));

        FeedbackSession session = new FeedbackSession();
        session.setModule(module);
        session.setInstructor(instructor);
        session.setCreatedDate(LocalDate.now());
        session.setActive(true);

        feedbackSessionRepository.save(session);
    }
    
    @Override
    public List<AnonymousFeedbackResponse> getAnonymousFeedbackForSession(Integer sessionId) {
    	
        List<Feedback> feedbackList = feedbackRepository.findByFeedbackSession_SessionId(sessionId);
        AtomicInteger counter = new AtomicInteger(1);

        return feedbackList.stream().map(feedback -> {
            AnonymousFeedbackResponse dto = new AnonymousFeedbackResponse();
            dto.setSerialNumber(counter.getAndIncrement());
            dto.setFeedbackId(feedback.getFeedbackId());
            dto.setTeachingStyleRating(feedback.getTeachingStyleRating());
            dto.setDoubtClearingRating(feedback.getDoubtClearingRating());
            dto.setComments(feedback.getComments());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteFeedback(Integer feedbackId) {
        if (!feedbackRepository.existsById(feedbackId)) {
            throw new ResourceNotFoundException("Feedback not found with id: " + feedbackId);
        }
        feedbackRepository.deleteById(feedbackId);
    }

    @Override
    public FeedbackStatsResponse getFeedbackStats(Integer sessionId) {
    	
        FeedbackSession session = feedbackSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback session not found"));
        
        List<Feedback> feedbackList = feedbackRepository.findByFeedbackSession_SessionId(sessionId);

        double avgTeaching = feedbackList.stream().mapToInt(Feedback::getTeachingStyleRating).average().orElse(0.0);
        double avgDoubt = feedbackList.stream().mapToInt(Feedback::getDoubtClearingRating).average().orElse(0.0);
        
        double overallAvg = (avgTeaching + avgDoubt) / 2.0;
        
        long totalSubmissions = feedbackList.size();
        
        long totalStudentsInDept = studentRepository.countByDepartment_DepartmentId(session.getModule().getDepartment().getDepartmentId());
        
        long pendingSubmissions = Math.max(0, totalStudentsInDept - totalSubmissions);

        return new FeedbackStatsResponse(overallAvg, totalSubmissions, pendingSubmissions);
    }
    
//    @Override
//    public List<FeedbackAveragesResponse> getFeedbackAverages() {
//        // Placeholder for future implementation
//        return List.of();
//    }
//    
//    @Override
//    public List<AdminFeedbackInstructorResponse> getAllInstructorsForAdminFeedbackView() {
//        // Placeholder for future implementation
//        return List.of();
//    }
}
