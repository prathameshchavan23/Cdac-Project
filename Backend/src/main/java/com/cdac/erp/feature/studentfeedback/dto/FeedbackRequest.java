package com.cdac.erp.feature.studentfeedback.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackRequest {
    
    @NotNull(message = "Session ID is required")
    private Integer sessionId;

    @NotNull(message = "Teaching style rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private int teachingStyleRating;

    @NotNull(message = "Doubt clearing rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private int doubtClearingRating;

    private String comments;
}