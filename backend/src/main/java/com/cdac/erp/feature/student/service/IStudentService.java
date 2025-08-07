package com.cdac.erp.feature.student.service;

import com.cdac.erp.feature.grades.dto.ScoreResponse;
//import com.cdac.erp.feature.student.dto.StudentAttendanceSummaryDto;
import com.cdac.erp.feature.student.dto.StudentCreateRequest;
import com.cdac.erp.feature.student.dto.StudentResponse;
import com.cdac.erp.feature.student.dto.StudentUpdateRequest;
import com.cdac.erp.feature.studentfeedback.dto.ActiveSessionResponse;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service interface for managing Student entities.
 * This includes both administrative actions and student-specific data retrieval.
 */
public interface IStudentService {

    /**
     * Creates a new student record. (Admin action)
     * @param createRequest The DTO containing the details for the new student.
     * @return A DTO representing the newly created student.
     */
    StudentResponse createStudent(StudentCreateRequest createRequest);

    /**
     * Updates an existing student's details. (Admin action)
     * @param prn The PRN of the student to update.
     * @param updateRequest The DTO containing the updated details.
     * @return A DTO representing the updated student.
     */
    StudentResponse updateStudent(String prn, StudentUpdateRequest updateRequest);

    /**
     * Deletes a student record by their PRN. (Admin action)
     * @param prn The PRN of the student to delete.
     */
    void deleteStudent(String prn);

    /**
     * Retrieves a single student's public profile by their PRN.
     * @param prn The PRN of the student to retrieve.
     * @return A DTO representing the found student.
     */
    StudentResponse getStudentByPrn(String prn);

    /**
     * Retrieves a paginated list of all students. (Admin action)
     * @param pageable The pagination information.
     * @return A paginated list of DTOs representing students.
     */
    Page<StudentResponse> getAllStudents(Pageable pageable);

    /**
     * Retrieves all marks for a specific student.
     * @param studentPrn The PRN of the student.
     * @return A list of DTOs representing the student's scores.
     */
    List<ScoreResponse> getMyMarks(String studentPrn);

    /**
     * Retrieves a list of active feedback sessions that are pending for a specific student.
     * @param studentPrn The PRN of the student.
     * @return A list of DTOs representing pending feedback sessions.
     */
    List<ActiveSessionResponse> getPendingFeedbackTasks(String studentPrn);
//    
//    /**
//     * Retrieves a summary of attendance for the student, aggregated by module.
//     * @param studentPrn The PRN of the student.
//     * @return A list of DTOs, each representing the attendance summary for one module.
//     */
//    List<StudentAttendanceSummaryDto> getAttendanceSummary(String studentPrn);
    
    Page<StudentResponse> getStudentsByModule(String moduleId, Pageable pageable); 
}