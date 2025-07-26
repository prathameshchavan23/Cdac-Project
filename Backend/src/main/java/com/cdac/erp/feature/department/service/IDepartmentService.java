package com.cdac.erp.feature.department.service;

import com.cdac.erp.core.model.Department;
import com.cdac.erp.feature.department.dto.DepartmentCreateRequest;
import com.cdac.erp.feature.department.dto.DepartmentUpdateRequest;
import java.util.List;

/**
 * Service interface for managing Department entities.
 */
public interface IDepartmentService {

	/**
	 * Retrieves a list of all departments.
	 * @return A list of all Department entities.
	 */
	List<Department> getAllDepartments();

	/**
	 * Retrieves a single department by its unique ID.
	 * @param departmentId The ID of the department to retrieve.
	 * @return The found Department entity.
	 */
	Department getDepartmentById(Integer departmentId);

	/**
	 * Creates a new department.
	 * @param createRequest The DTO containing the details for the new department.
	 * @return The newly created Department entity.
	 */
	Department createDepartment(DepartmentCreateRequest createRequest);

	/**
	 * Updates an existing department's details.
	 * @param departmentId The ID of the department to update.
	 * @param updateRequest The DTO containing the updated details.
	 * @return The updated Department entity.
	 */
	Department updateDepartment(Integer departmentId, DepartmentUpdateRequest updateRequest);

	/**
	 * Deletes a department by its unique ID.
	 * @param departmentId The ID of the department to delete.
	 */
	void deleteDepartment(Integer departmentId);
}