package com.cdac.erp.feature.department.service;

import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Department;
import com.cdac.erp.core.repository.DepartmentRepository;
import com.cdac.erp.feature.department.dto.DepartmentCreateRequest; // CHANGE: Import the correct DTO
import com.cdac.erp.feature.department.dto.DepartmentUpdateRequest;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DepartmentServiceImpl implements IDepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Department getDepartmentById(Integer departmentId) {
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + departmentId));
    }

    // --- Start of a change ---
    @Override
    public Department createDepartment(DepartmentCreateRequest createRequest) { // CHANGE: Use DepartmentCreateRequest
        Department department = new Department(createRequest.getDepartmentName());
        return departmentRepository.save(department);
    }
    // --- End of a change ---

    @Override
    @Transactional
    public Department updateDepartment(Integer departmentId, DepartmentUpdateRequest updateRequest) {
        Department existingDepartment = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + departmentId));

        existingDepartment.setDepartmentName(updateRequest.getDepartmentName());

        return departmentRepository.save(existingDepartment);
    }

    @Override
    public void deleteDepartment(Integer departmentId) {
        if (!departmentRepository.existsById(departmentId)) {
            throw new ResourceNotFoundException("Department not found with id: " + departmentId);
        }
        departmentRepository.deleteById(departmentId);
    }
}