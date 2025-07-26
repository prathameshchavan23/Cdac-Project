package com.cdac.erp.feature.grades.dto;

import lombok.Getter;
import lombok.Setter;

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
}