package com.cdac.erp.feature.grades.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExamRequest {

    @NotBlank(message = "Module ID is required")
    private String moduleId;

    @NotBlank(message = "Exam name is required")
    private String examName;

    @NotNull(message = "Exam date is required")
    private LocalDate examDate;
}