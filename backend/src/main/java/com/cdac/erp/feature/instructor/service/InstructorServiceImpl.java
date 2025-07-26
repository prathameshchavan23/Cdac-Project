package com.cdac.erp.feature.instructor.service;

import com.cdac.erp.common.exception.ConflictException;
import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Instructor;
import com.cdac.erp.core.repository.FeedbackRepository;
import com.cdac.erp.core.repository.InstructorRepository;
import com.cdac.erp.core.repository.TimetableEntryRepository;
import com.cdac.erp.feature.instructor.dto.InstructorRequest;
import com.cdac.erp.feature.instructor.dto.InstructorResponse;
import com.cdac.erp.feature.instructor.dto.InstructorUpdateRequest;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class InstructorServiceImpl implements IInstructorService {

	@Autowired
	private InstructorRepository instructorRepository;

	@Autowired // for checking dependency
	private TimetableEntryRepository timetableEntryRepository;

	@Autowired // Add this
	private FeedbackRepository feedbackRepository;

	@Override
	public Instructor createInstructor(InstructorRequest request) {
		Instructor instructor = new Instructor();
		instructor.setFirstName(request.getFirstName());
		instructor.setLastName(request.getLastName());
		instructor.setEmail(request.getEmail());
		instructor.setContactNo(request.getContactNo());

		return instructorRepository.save(instructor);
	}

	@Override
	@Transactional
	public Instructor updateInstructor(Integer instructorId, InstructorUpdateRequest request) {
		Instructor existingInstructor = instructorRepository.findById(instructorId)
				.orElseThrow(() -> new ResourceNotFoundException("Instructor not found with id: " + instructorId));

		existingInstructor.setFirstName(request.getFirstName());
		existingInstructor.setLastName(request.getLastName());
		existingInstructor.setEmail(request.getEmail());
		existingInstructor.setContactNo(request.getContactNo());

		return instructorRepository.save(existingInstructor);
	}

//	@Override
//	public List<Instructor> getAllInstructors() {
//		return instructorRepository.findAll();
//	}
	@Override
    public Page<InstructorResponse> getAllInstructors(Pageable pageable) {
        Page<Instructor> instructorPage = instructorRepository.findAll(pageable);
        return instructorPage.map(this::convertToDto);
    }

	@Override
	public Instructor getInstructorById(Integer instructorId) {
		return instructorRepository.findById(instructorId)
				.orElseThrow(() -> new ResourceNotFoundException("Instructor not found with id: " + instructorId));
	}

	@Override
	public void deleteInstructor(Integer instructorId) {
		if (!instructorRepository.existsById(instructorId)) {
			throw new ResourceNotFoundException("Instructor not found with id: " + instructorId);
		}

		// Check for dependencies before deleting
		if (timetableEntryRepository.existsByInstructor_InstructorId(instructorId)) {
			throw new ConflictException(
					"Cannot delete instructor. They are assigned to one or more timetable entries.");
		}
		if (feedbackRepository.existsByInstructor_InstructorId(instructorId)) {
			throw new ConflictException("Cannot delete instructor. They are linked to one or more feedback records.");
		}

		instructorRepository.deleteById(instructorId);
	}
	 private InstructorResponse convertToDto(Instructor instructor) {
	        InstructorResponse dto = new InstructorResponse();
	        dto.setInstructorId(instructor.getInstructorId());
	        dto.setFirstName(instructor.getFirstName());
	        dto.setLastName(instructor.getLastName());
	        dto.setEmail(instructor.getEmail());
	        dto.setContactNo(instructor.getContactNo());
	        return dto;
	    }
}