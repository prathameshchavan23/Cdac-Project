package com.cdac.erp.feature.department.controller;

import com.cdac.erp.core.model.Department;
import com.cdac.erp.feature.department.dto.DepartmentCreateRequest;
import com.cdac.erp.feature.department.dto.DepartmentUpdateRequest;
import com.cdac.erp.feature.department.service.IDepartmentService;

import jakarta.validation.Valid;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/departments")
public class DepartmentController {

	@Autowired
	private IDepartmentService departmentService;

	@PostMapping
	public ResponseEntity<Department> createDepartment(@Valid @RequestBody DepartmentCreateRequest createRequest) {
		Department newDepartment = departmentService.createDepartment(createRequest);
		return new ResponseEntity<>(newDepartment, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Department>> getAllDepartments() {
		List<Department> departments = departmentService.getAllDepartments();
		return ResponseEntity.ok(departments);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Department> getDepartmentById(@PathVariable Integer id) {
		Department department = departmentService.getDepartmentById(id);
		return ResponseEntity.ok(department);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Department> updateDepartment(@PathVariable Integer id,
			@Valid @RequestBody DepartmentUpdateRequest updateRequest) {
		Department updatedDepartment = departmentService.updateDepartment(id, updateRequest);
		return ResponseEntity.ok(updatedDepartment);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDepartment(@PathVariable Integer id) {
		departmentService.deleteDepartment(id);
		return ResponseEntity.noContent().build();
	}
}