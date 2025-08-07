package com.cdac.erp.feature.timetable.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TimetableEntryResponse {
    private Integer timetableEntryId;
    private String moduleId;
    private String moduleName;
    private Integer instructorId;
    private String instructorName;
    private LocalDate lectureDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String dayOfWeek;
    private String roomNumber;
    private Boolean isLab;
}