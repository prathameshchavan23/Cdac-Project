package com.cdac.erp.feature.admindashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AdminDashboardStatsDto {
    private long totalStudents;
    private long totalInstructors;
    private long totalModules;
}