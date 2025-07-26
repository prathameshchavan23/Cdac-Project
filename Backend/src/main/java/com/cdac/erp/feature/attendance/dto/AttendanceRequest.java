package com.cdac.erp.feature.attendance.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceRequest {

    @NotBlank(message = "Student PRN is required")
    private String studentPrn;

    @NotNull(message = "Timetable entry ID is required")
    private Integer timetableEntryId;

    @NotNull(message = "Attendance date is required")
    private LocalDate attendanceDate;

    @NotNull(message = "Presence status is required")
    private Boolean present;

    private BigDecimal attendedHours;
}