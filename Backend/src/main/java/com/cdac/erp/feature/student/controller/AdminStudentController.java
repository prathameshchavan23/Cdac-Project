package com.cdac.erp.feature.student.controller;

import com.cdac.erp.feature.student.dto.StudentCreateRequest;
import jakarta.validation.Valid;
import com.cdac.erp.feature.student.dto.StudentResponse;
import com.cdac.erp.feature.student.dto.StudentUpdateRequest;
import com.cdac.erp.feature.student.service.IStudentService;
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
@RequestMapping("/api/admin/students")
public class AdminStudentController {

	@Autowired
	private IStudentService studentService;

	@PostMapping
	public ResponseEntity<StudentResponse> createStudent(@Valid @RequestBody StudentCreateRequest createRequest) {
		StudentResponse newStudent = studentService.createStudent(createRequest);
		return new ResponseEntity<>(newStudent, HttpStatus.CREATED);
	}

	@GetMapping("/{prn}")
	public ResponseEntity<StudentResponse> getStudentByPrn(@PathVariable String prn) {
		StudentResponse student = studentService.getStudentByPrn(prn);
		return ResponseEntity.ok(student);
	}

	@GetMapping
	public ResponseEntity<Page<StudentResponse>> getAllStudents(Pageable pageable) {
//        List<StudentResponse> students = studentService.getAllStudents();
		Page<StudentResponse> students = studentService.getAllStudents(pageable);
		return ResponseEntity.ok(students);
	}

	@PutMapping("/{prn}")
	public ResponseEntity<StudentResponse> updateStudent(@Valid @PathVariable String prn,
			@RequestBody StudentUpdateRequest updateRequest) {
		StudentResponse updatedStudent = studentService.updateStudent(prn, updateRequest);
		return ResponseEntity.ok(updatedStudent);
	}

	@DeleteMapping("/{prn}")
	public ResponseEntity<Void> deleteStudent(@PathVariable String prn) {
		studentService.deleteStudent(prn);
		return ResponseEntity.noContent().build();
	}
}