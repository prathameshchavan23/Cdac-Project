package com.cdac.erp.feature.adminfeedback.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackSessionRequest {
    @NotNull(message = "Module ID is required")
    private String moduleId;

    @NotNull(message = "Instructor ID is required")
    private Integer instructorId;
}