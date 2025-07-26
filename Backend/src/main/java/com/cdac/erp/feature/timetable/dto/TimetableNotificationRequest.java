package com.cdac.erp.feature.timetable.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TimetableNotificationRequest {
    @NotBlank
    private String subject;

    @NotBlank
    private String message;
}