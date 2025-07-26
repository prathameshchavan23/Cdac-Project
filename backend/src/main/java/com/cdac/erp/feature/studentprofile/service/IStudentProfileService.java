package com.cdac.erp.feature.studentprofile.service;

import com.cdac.erp.feature.student.dto.StudentResponse;

/**
 * Service interface for student-facing profile operations.
 */
public interface IStudentProfileService {

    /**
     * Retrieves the public profile of the currently logged-in student.
     * @param studentPrn The PRN of the student.
     * @return A DTO representing the student's profile.
     */
    StudentResponse getStudentProfile(String studentPrn);
}