package com.cdac.erp.feature.grades.dto;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExamResponse {
    private Integer examId;
    private String moduleId;
    private String moduleName;
    private String examName;
    private LocalDate examDate;
}