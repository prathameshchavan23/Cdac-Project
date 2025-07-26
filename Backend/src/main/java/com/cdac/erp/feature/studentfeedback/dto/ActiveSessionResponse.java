package com.cdac.erp.feature.studentfeedback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ActiveSessionResponse {
    private Integer sessionId;
    private String moduleName;
    private String instructorName;
}