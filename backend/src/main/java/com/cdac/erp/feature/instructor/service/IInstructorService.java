package com.cdac.erp.feature.instructor.service;

import com.cdac.erp.core.model.Instructor;
import com.cdac.erp.feature.instructor.dto.InstructorRequest;
import com.cdac.erp.feature.instructor.dto.InstructorResponse;
import com.cdac.erp.feature.instructor.dto.InstructorUpdateRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service interface for managing Instructor entities.
 */
public interface IInstructorService {
	/**
     * Creates a new instructor.
     * @param request The DTO containing the details for the new instructor.
     * @return A DTO representing the newly created instructor.
     */
	Instructor createInstructor(InstructorRequest request);
	/**
     * Updates an existing instructor's details.
     * @param instructorId The ID of the instructor to update.
     * @param request The DTO containing the updated details.
     * @return A DTO representing the updated instructor.
     */
	Instructor updateInstructor(Integer instructorId, InstructorUpdateRequest request); // Add this
    
	 /**
     * Deletes an instructor by their unique ID.
     * @param instructorId The ID of the instructor to delete.
     */
	void deleteInstructor(Integer instructorId); // Add this
    
	/**
     * Retrieves a paginated list of all instructors.
     * @param pageable The pagination information.
     * @return A paginated list of DTOs representing instructors.
     */
	Page<InstructorResponse> getAllInstructors(Pageable pageable);
    
	 /**
     * Retrieves a single instructor by their unique ID.
     * @param instructorId The ID of the instructor to retrieve.
     * @return A DTO representing the found instructor.
     */
	Instructor getInstructorById(Integer instructorId); // Add this
}