package com.cdac.erp.feature.adminfeedback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FeedbackSessionResponse {
    private Integer sessionId;
    private String moduleName;
    private String instructorName;
    private boolean isActive;
}