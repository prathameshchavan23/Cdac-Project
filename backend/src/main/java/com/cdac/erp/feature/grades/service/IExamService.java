package com.cdac.erp.feature.grades.service;

import com.cdac.erp.feature.grades.dto.ExamRequest;
import com.cdac.erp.feature.grades.dto.ExamResponse;
import java.util.List;

/**
 * Service interface for managing Exam entities.
 */
public interface IExamService {

    /**
     * Creates a new exam for a specific module.
     * @param request The DTO containing the details for the new exam.
     * @return A DTO representing the newly created exam.
     */
    ExamResponse createExam(ExamRequest request);

    /**
     * Retrieves a list of all exams.
     * @return A list of DTOs representing all exams.
     */
    List<ExamResponse> getAllExams();
    
    List<ExamResponse> getExamsByModule(String moduleId);
    
    
}