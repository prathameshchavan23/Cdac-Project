package com.cdac.erp.feature.studentdashboard.dto; // Updated package

import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TodaysClassResponseDto {
    private String moduleName;
    private LocalTime startTime;
    private LocalTime endTime;
    private String attendanceStatus;
}