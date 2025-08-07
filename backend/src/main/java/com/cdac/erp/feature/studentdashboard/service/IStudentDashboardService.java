package com.cdac.erp.feature.studentdashboard.service;

import com.cdac.erp.feature.studentdashboard.dto.StudentDashboardStatsDto;
import com.cdac.erp.feature.studentdashboard.dto.TodaysClassResponseDto;
import java.util.List;

/**
 * Service interface for handling student dashboard-related data retrieval.
 */
public interface IStudentDashboardService {

    /**
     * Retrieves key statistics for the logged-in student's dashboard.
     * @param studentPrn The PRN of the student.
     * @return A DTO containing the student's total course count and attendance percentage.
     */
    StudentDashboardStatsDto getStudentDashboardStats(String studentPrn);

//    /**
//     * Retrieves the class schedule for the current day for the logged-in student.
//     * @param studentPrn The PRN of the student.
//     * @return A list of DTOs representing today's classes, including their attendance status.
//     */
//    List<TodaysClassResponseDto> getTodaysClasses(String studentPrn);
}