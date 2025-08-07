package com.cdac.erp.feature.grades.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class ScoreResponse {
    private Integer scoreId;
    private String studentPrn;
    private String studentName;
    private Integer examId;
    private String examName;
    private String moduleName;
    private Integer labExamMarks;
    private Integer internalMarks;
    private LocalDate examDate;
}