package com.cdac.erp.feature.studentfeedback.service;

import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Feedback;
import com.cdac.erp.core.model.FeedbackSession;
import com.cdac.erp.core.model.Student;
import com.cdac.erp.core.repository.FeedbackRepository;
import com.cdac.erp.core.repository.FeedbackSessionRepository;
import com.cdac.erp.core.repository.StudentRepository;
import com.cdac.erp.feature.studentfeedback.dto.ActiveSessionResponse;
import com.cdac.erp.feature.studentfeedback.dto.FeedbackRequest;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentFeedbackServiceImpl implements IStudentFeedbackService {

	@Autowired
	private FeedbackRepository feedbackRepository;
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private FeedbackSessionRepository feedbackSessionRepository;

	@Override
	public void submitFeedback(String studentPrn, FeedbackRequest request) {
		
		Student student = studentRepository.findById(studentPrn)
				.orElseThrow(() -> new ResourceNotFoundException("Student not found"));

		FeedbackSession session = feedbackSessionRepository.findById(request.getSessionId())
				.orElseThrow(() -> new ResourceNotFoundException("Feedback session not found"));

		Feedback feedback = new Feedback();
		feedback.setStudent(student);
		feedback.setFeedbackSession(session);
		feedback.setTeachingStyleRating(request.getTeachingStyleRating());
		feedback.setDoubtClearingRating(request.getDoubtClearingRating());
		feedback.setComments(request.getComments());
		feedback.setFeedbackDate(LocalDate.now());
		feedback.setStatus("Submitted");

		feedbackRepository.save(feedback);
	}

//	@Override
//	public List<ActiveSessionResponse> getActiveFeedbackSessions() {
//		return feedbackSessionRepository.findByIsActive(true).stream()
//				.map(session -> new ActiveSessionResponse(session.getSessionId(), session.getModule().getModuleName(),
//						session.getInstructor().getFirstName() + " " + session.getInstructor().getLastName()))
//				.collect(Collectors.toList());
//	}
}