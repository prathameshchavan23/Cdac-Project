package com.cdac.erp.feature.grades.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentScoreDto {

    @NotBlank(message = "Student PRN is required")
    private String studentPrn;

    @NotNull(message = "Lab exam marks are required")
    private Integer labExamMarks;

    @NotNull(message = "Internal marks are required")
    private Integer internalMarks;
}