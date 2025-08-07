package com.cdac.erp.feature.admindashboard.service;

import com.cdac.erp.feature.admindashboard.dto.AdminDashboardStatsDto;

/**
 * Service interface for handling admin dashboard-related operations.
 */
public interface IAdminDashboardService {

	/**
	 * Retrieves key statistics for the admin dashboard.
	 * 
	 * @return A DTO containing counts of total students, instructors, and modules.
	 */
	AdminDashboardStatsDto getDashboardStats();
}