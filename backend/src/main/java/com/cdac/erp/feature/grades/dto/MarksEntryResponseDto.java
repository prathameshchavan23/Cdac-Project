package com.cdac.erp.feature.grades.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MarksEntryResponseDto {
    private String studentPrn;
    private String studentName;
    private Integer labExamMarks;
    private Integer internalMarks;
}