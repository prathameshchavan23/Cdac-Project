package com.cdac.erp.feature.studentmarks.service;

import com.cdac.erp.feature.grades.dto.ScoreResponse;
import java.util.List;

/**
 * Service interface for student-facing marks retrieval operations.
 */
public interface IStudentMarksService {

    /**
     * Retrieves all marks for the currently logged-in student.
     * @param studentPrn The PRN of the student.
     * @return A list of DTOs representing all of the student's scores.
     */
    List<ScoreResponse> getMyMarks(String studentPrn);
}