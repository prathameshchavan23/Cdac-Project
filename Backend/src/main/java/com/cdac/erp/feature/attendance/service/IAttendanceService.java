package com.cdac.erp.feature.attendance.service;

import com.cdac.erp.feature.attendance.dto.AttendanceRequest;
import com.cdac.erp.feature.attendance.dto.AttendanceResponse;
import com.cdac.erp.feature.attendance.dto.AttendanceUpdateRequest;
import com.cdac.erp.feature.attendance.dto.BulkAttendanceRequest;
import java.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service interface for handling attendance-related operations.
 */
public interface IAttendanceService {

    /**
     * Marks attendance for a single student for a specific class session.
     * @param request The details of the attendance to be marked.
     * @return A DTO representing the newly created attendance record.
     */
    AttendanceResponse markAttendance(AttendanceRequest request);

    /**
     * Marks or updates attendance for a list of students in bulk for a specific class session.
     * @param request The details of the bulk attendance operation.
     */
    void markBulkAttendance(BulkAttendanceRequest request);

    /**
     * Retrieves a paginated list of all attendance records for a specific class session.
     * @param timetableEntryId The ID of the timetable entry (class session).
     * @param pageable The pagination information.
     * @return A paginated list of attendance records.
     */
    Page<AttendanceResponse> getAttendanceForSession(Integer timetableEntryId, Pageable pageable);

    /**
     * Retrieves a paginated list of attendance records for a specific class session on a specific date.
     * @param timetableEntryId The ID of the timetable entry (class session).
     * @param date The specific date to fetch records for.
     * @param pageable The pagination information.
     * @return A paginated list of attendance records for the given date.
     */
    Page<AttendanceResponse> getAttendanceForSessionAndDate(Integer timetableEntryId, LocalDate date, Pageable pageable);

    /**
     * Updates an existing attendance record.
     * @param attendanceId The ID of the attendance record to update.
     * @param request The updated attendance details.
     * @return A DTO representing the updated attendance record.
     */
    AttendanceResponse updateAttendance(Integer attendanceId, AttendanceUpdateRequest request);

    /**
     * Deletes an attendance record by its ID.
     * @param attendanceId The ID of the attendance record to delete.
     */
    void deleteAttendance(Integer attendanceId);
}