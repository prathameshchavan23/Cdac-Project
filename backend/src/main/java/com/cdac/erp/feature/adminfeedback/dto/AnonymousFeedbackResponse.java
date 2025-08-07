package com.cdac.erp.feature.adminfeedback.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnonymousFeedbackResponse {
	
    private int serialNumber;
    private Integer feedbackId;
    private int teachingStyleRating;
    private int doubtClearingRating;
    private String comments;
}