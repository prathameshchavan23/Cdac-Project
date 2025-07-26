package com.cdac.erp.feature.grades.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExamUpdateRequest {

    @NotBlank(message = "Exam name is required")
    private String examName;

    @NotNull(message = "Exam date is required")
    @FutureOrPresent(message = "Exam date must be in the present or future")
    private LocalDate examDate;

    @NotNull(message = "Max marks are required")
    @Positive(message = "Max marks must be positive")
    private BigDecimal maxMarks;
}