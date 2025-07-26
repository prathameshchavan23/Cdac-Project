package com.cdac.erp.feature.grades.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoreRequest {

    @NotBlank(message = "Student PRN is required")
    private String studentPrn;

    @NotNull(message = "Exam ID is required")
    private Integer examId;

    @NotNull(message = "Marks obtained are required")
    @PositiveOrZero(message = "Marks must be zero or positive")
    private BigDecimal marksObtained;
}