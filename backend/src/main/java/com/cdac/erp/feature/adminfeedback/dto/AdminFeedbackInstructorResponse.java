package com.cdac.erp.feature.adminfeedback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AdminFeedbackInstructorResponse {
    private Integer instructorId;
    private String instructorName;
    private boolean hasFeedback;
}