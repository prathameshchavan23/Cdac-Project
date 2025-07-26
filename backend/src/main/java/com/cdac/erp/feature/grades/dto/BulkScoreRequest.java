package com.cdac.erp.feature.grades.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BulkScoreRequest {

    @NotNull(message = "Exam ID is required")
    private Integer examId;

    @Valid // This is crucial to validate the objects inside the list
    @NotEmpty(message = "Scores list cannot be empty")
    private List<StudentScoreDto> scores;
}