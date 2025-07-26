package com.cdac.erp.core.repository;

import com.cdac.erp.core.model.Feedback;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
	List<Feedback> findByInstructor_InstructorIdAndModule_ModuleId(Integer instructorId, String moduleId);

	boolean existsByInstructor_InstructorId(Integer instructorId);

	boolean existsByResolvedByAdmin_AdminId(Integer adminId);

	List<Feedback> findByFeedbackSession_SessionId(Integer sessionId);
}