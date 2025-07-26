package com.cdac.erp.feature.adminfeedback.service;

import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Feedback;
import com.cdac.erp.core.model.FeedbackSession;
import com.cdac.erp.core.model.Instructor;
import com.cdac.erp.core.model.Module;
import com.cdac.erp.core.repository.*;
import com.cdac.erp.feature.adminfeedback.dto.*;
import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminFeedbackServiceImpl implements IAdminFeedbackService {

    @Autowired private FeedbackRepository feedbackRepository;
    @Autowired private InstructorRepository instructorRepository;
    @Autowired private ModuleRepository moduleRepository;
    @Autowired private FeedbackSessionRepository feedbackSessionRepository;
    @Autowired private StudentRepository studentRepository;

    @Override
    public void createFeedbackSession(FeedbackSessionRequest request) {
        Module module = moduleRepository.findById(request.getModuleId())
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
    public List<FeedbackAveragesResponse> getFeedbackAverages() {
        // Placeholder as per original implementation. This needs to be refactored based on FeedbackSession.
        return List.of(); 
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
    public List<AdminFeedbackInstructorResponse> getAllInstructorsForAdminFeedbackView() {
        List<Instructor> allInstructors = instructorRepository.findAll();
        return allInstructors.stream()
                .map(instructor -> {
                    boolean feedbackExists = feedbackRepository.existsByInstructor_InstructorId(instructor.getInstructorId());
                    return new AdminFeedbackInstructorResponse(
                            instructor.getInstructorId(),
                            instructor.getFirstName() + " " + instructor.getLastName(),
                            feedbackExists
                    );
                })
                .collect(Collectors.toList());
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
        // --- Start of a change ---
        long totalStudentsInDept = studentRepository.countByDepartment_DepartmentId(session.getModule().getDepartment().getDepartmentId());
        
        // Ensure pending submissions is never negative
        long pendingSubmissions = Math.max(0, totalStudentsInDept - totalSubmissions);
        // --- End of a change ---

        return new FeedbackStatsResponse(overallAvg, totalSubmissions, pendingSubmissions);
    }
}