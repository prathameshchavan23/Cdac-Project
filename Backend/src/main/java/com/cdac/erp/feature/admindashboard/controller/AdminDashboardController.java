package com.cdac.erp.feature.admindashboard.controller;

import com.cdac.erp.feature.admindashboard.dto.AdminDashboardStatsDto;
import com.cdac.erp.feature.admindashboard.service.IAdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    @Autowired
    private IAdminDashboardService adminDashboardService;

    @GetMapping("/stats")
    public ResponseEntity<AdminDashboardStatsDto> getDashboardStats() {
        AdminDashboardStatsDto stats = adminDashboardService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
}