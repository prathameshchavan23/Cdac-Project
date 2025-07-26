package com.cdac.erp.feature.adminfeedback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FeedbackAveragesResponse {
    private Integer instructorId;
    private String instructorName;
    private String moduleId;
    private String moduleName;
    private double avgTeachingStyleRating;
    private double avgDoubtClearingRating;
    private double overallAverageRating;
    private long feedbackCount;
}