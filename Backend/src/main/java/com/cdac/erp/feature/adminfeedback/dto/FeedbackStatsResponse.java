package com.cdac.erp.feature.adminfeedback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FeedbackStatsResponse {
    private double averageRating;
    private long totalSubmissions;
    private long pendingSubmissions;
}