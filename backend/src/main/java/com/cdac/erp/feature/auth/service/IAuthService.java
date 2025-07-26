package com.cdac.erp.feature.auth.service;

import java.util.List;

import com.cdac.erp.feature.auth.dto.AdminRegisterRequest;
import com.cdac.erp.feature.auth.dto.AdminResponse;
import com.cdac.erp.feature.auth.dto.AdminUpdateRequest;
import com.cdac.erp.feature.auth.dto.AuthResponse;
import com.cdac.erp.feature.auth.dto.LoginRequest;

/**
 * Service interface for authentication and administrator management operations.
 */
public interface IAuthService {

	/**
	 * Registers a new administrator in the system.
	 * @param registerRequest The DTO containing the new admin's details.
	 * @return A DTO representing the newly created admin.
	 */
	AdminResponse registerAdmin(AdminRegisterRequest registerRequest);

	/**
	 * Authenticates a user (Admin or Student) and returns a JWT.
	 * @param loginRequest The DTO containing the user's login credentials.
	 * @return A DTO containing the JWT and basic user info.
	 */
	AuthResponse login(LoginRequest loginRequest);

	/**
	 * Retrieves a list of all administrators.
	 * @return A list of DTOs representing all admins.
	 */
	List<AdminResponse> getAllAdmins();

	/**
	 * Retrieves a single administrator by their unique ID.
	 * @param adminId The ID of the admin to retrieve.
	 * @return A DTO representing the found admin.
	 */
	AdminResponse getAdminById(Integer adminId);

	/**
	 * Updates an existing administrator's details.
	 * @param adminId The ID of the admin to update.
	 * @param request The DTO containing the updated details.
	 * @return A DTO representing the updated admin.
	 */
	AdminResponse updateAdmin(Integer adminId, AdminUpdateRequest request);

	/**
	 * Deletes an administrator by their unique ID.
	 * @param adminId The ID of the admin to delete.
	 */
	void deleteAdmin(Integer adminId);
}