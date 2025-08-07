package com.cdac.erp.feature.grades.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoreUpdateRequest {

    @NotNull(message = "Lab marks are required")
    @Min(value = 0, message = "Marks must be zero or positive")
    @Max(value = 40, message = "Lab marks cannot exceed 40")
    private Integer  labExamMarks;

    @NotNull(message = "Internal marks are required")
    @Min(value = 0, message = "Marks must be zero or positive")
    @Max(value = 20, message = "Internal marks cannot exceed 20")
    private Integer  internalMarks;
}