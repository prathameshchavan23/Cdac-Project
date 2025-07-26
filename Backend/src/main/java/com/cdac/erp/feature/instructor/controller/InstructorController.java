package com.cdac.erp.feature.instructor.controller;

import com.cdac.erp.core.model.Instructor;
import com.cdac.erp.feature.instructor.dto.InstructorRequest;
import com.cdac.erp.feature.instructor.dto.InstructorResponse;
import com.cdac.erp.feature.instructor.dto.InstructorUpdateRequest;
import com.cdac.erp.feature.instructor.service.IInstructorService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/instructors")
public class InstructorController {

	@Autowired
	private IInstructorService instructorService;

	@PostMapping
	public ResponseEntity<Instructor> createInstructor(@Valid @RequestBody InstructorRequest request) {
		Instructor newInstructor = instructorService.createInstructor(request);
		return new ResponseEntity<>(newInstructor, HttpStatus.CREATED);
	}

//	@GetMapping
//	public ResponseEntity<List<Instructor>> getAllInstructors() {
//		return ResponseEntity.ok(instructorService.getAllInstructors());
//	}
	
    @GetMapping
    public ResponseEntity<Page<InstructorResponse>> getAllInstructors(Pageable pageable) {
        Page<InstructorResponse> instructors = instructorService.getAllInstructors(pageable);
        return ResponseEntity.ok(instructors);
    }

	@GetMapping("/{id}")
	public ResponseEntity<Instructor> getInstructorById(@PathVariable Integer id) {
		return ResponseEntity.ok(instructorService.getInstructorById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Instructor> updateInstructor(@PathVariable Integer id,
			@Valid @RequestBody InstructorUpdateRequest request) {
		Instructor updatedInstructor = instructorService.updateInstructor(id, request);
		return ResponseEntity.ok(updatedInstructor);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteInstructor(@PathVariable Integer id) {
		instructorService.deleteInstructor(id);
		return ResponseEntity.noContent().build();
	}
}