package com.cdac.erp.feature.module.service;

import com.cdac.erp.core.model.CourseModule;
import com.cdac.erp.feature.module.dto.ModuleCreateRequest;
import com.cdac.erp.feature.module.dto.ModuleResponse;
import com.cdac.erp.feature.module.dto.ModuleUpdateRequest;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IModuleService {
	
	/**
	 * Creates a new module.
	 * @param createRequest The DTO containing the details for the new module.
	 * @return A DTO representing the newly created module.
	 */
	ModuleResponse createModule(ModuleCreateRequest createRequest);

	/**
	 * Retrieves a paginated list of all modules.
	 * @param pageable The pagination information.
	 * @return A paginated list of DTOs representing modules.
	 */
	Page<ModuleResponse> getAllModules(Pageable pageable);
	/**
	 * Retrieves a single module by its unique ID.
	 * @param moduleId The ID of the module to retrieve (e.g., "CS101").
	 * @return A DTO representing the found module.
	 */
	ModuleResponse getModuleById(String moduleId);
	
	/**
	 * Updates an existing module's details.
	 * @param moduleId The ID of the module to update.
	 * @param request The DTO containing the updated details.
	 * @return A DTO representing the updated module.
	 */
	ModuleResponse updateModule(String moduleId, ModuleUpdateRequest request);
	
	/**
	 * Deletes a module by its unique ID.
	 * @param moduleId The ID of the module to delete.
	 */
	void deleteModule(String moduleId);
}