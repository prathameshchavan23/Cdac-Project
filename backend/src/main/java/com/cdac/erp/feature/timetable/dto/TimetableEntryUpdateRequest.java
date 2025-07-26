package com.cdac.erp.feature.timetable.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TimetableEntryUpdateRequest {

    @NotBlank(message = "Module ID is required")
    private String moduleId;

    @NotNull(message = "Instructor ID is required")
    private Integer instructorId;

    @NotNull(message = "Lecture date is required")
    @FutureOrPresent(message = "Lecture date must be in the present or future")
    private LocalDate lectureDate;

    @NotNull(message = "Start time is required")
    private LocalTime startTime;

    @NotNull(message = "End time is required")
    private LocalTime endTime;

    @NotBlank(message = "Day of week is required")
    private String dayOfWeek;

    private String roomNumber;
    private boolean isLab;
}