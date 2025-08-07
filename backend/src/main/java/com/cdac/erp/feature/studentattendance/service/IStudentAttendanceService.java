package com.cdac.erp.feature.studentattendance.service;

import com.cdac.erp.feature.studentattendance.dto.DailyAttendanceResponseDto;
import com.cdac.erp.feature.timetable.dto.TimetableEntryResponse;

import java.time.LocalDate;
import java.util.List;

/**
 * Service interface for student-facing attendance operations.
 */
public interface IStudentAttendanceService {

    /**
     * Retrieves a student's full attendance record for a specific date.
     * @param studentPrn The PRN of the student.
     * @param date The date for which to retrieve attendance.
     * @return A list of DTOs representing each class and its attendance status for that day.
     */
    List<DailyAttendanceResponseDto> getDailyAttendance(String studentPrn, LocalDate date);
    
}