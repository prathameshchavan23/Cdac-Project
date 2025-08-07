package com.cdac.erp.feature.studentattendance.dto;

import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DailyAttendanceResponseDto {
    private String courseCode;
    private String courseName;
    private String status;
    private LocalTime checkInTime; // Corresponds to startTime in TimetableEntry
}