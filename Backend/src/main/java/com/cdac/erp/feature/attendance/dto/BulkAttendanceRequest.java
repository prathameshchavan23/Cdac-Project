package com.cdac.erp.feature.attendance.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BulkAttendanceRequest {

    @NotNull(message = "Timetable entry ID is required")
    private Integer timetableEntryId;

    @NotNull(message = "Attendance date is required")
    private LocalDate attendanceDate;

    @Valid // This enables validation for the nested objects
    @NotEmpty(message = "Attendances list cannot be empty")
    private List<StudentAttendanceDto> attendances;
}