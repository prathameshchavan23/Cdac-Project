package com.cdac.erp.feature.attendance.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceResponse {
    private Integer attendanceId;
    private String studentPrn;
    private String studentName;
    private Integer timetableEntryId;
    private String moduleName;
    private LocalDate attendanceDate;
    private Boolean present; // Changed from boolean to Boolean
    private BigDecimal attendedHours;
}