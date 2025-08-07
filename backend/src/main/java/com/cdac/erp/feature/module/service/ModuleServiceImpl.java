package com.cdac.erp.feature.module.service;

import com.cdac.erp.common.exception.ConflictException;
import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Department;
import com.cdac.erp.core.model.CourseModule;
import com.cdac.erp.core.repository.DepartmentRepository;
import com.cdac.erp.core.repository.ExamRepository;
import com.cdac.erp.core.repository.CourseModuleRepository;
import com.cdac.erp.core.repository.TimetableEntryRepository;
import com.cdac.erp.feature.module.dto.ModuleCreateRequest;
import com.cdac.erp.feature.module.dto.ModuleResponse;
import com.cdac.erp.feature.module.dto.ModuleUpdateRequest;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ModuleServiceImpl implements IModuleService {

	@Autowired
	private CourseModuleRepository moduleRepository;

	@Autowired
	private DepartmentRepository departmentRepository;
	
	@Autowired
    private ExamRepository examRepository;

    @Autowired
    private TimetableEntryRepository timetableEntryRepository;

    @Override
    public ModuleResponse createModule(ModuleCreateRequest createRequest) {
        // Find the department to associate with the module
        Department department = departmentRepository.findById(createRequest.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Department not found with id: " + createRequest.getDepartmentId()));

        CourseModule module = new CourseModule();
        module.setModuleId(createRequest.getModuleId());
        module.setModuleName(createRequest.getModuleName());
        module.setDepartment(department);

        CourseModule savedModule = moduleRepository.save(module);

        // Convert the saved entity to a DTO before returning
        return convertToDto(savedModule);
    }

//	@Override
//	public List<ModuleResponse> getAllModules() {
//		return moduleRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
//	}
	
	@Override
    public Page<ModuleResponse> getAllModules(Pageable pageable) {
        Page<CourseModule> modulePage = moduleRepository.findAll(pageable);
        return modulePage.map(this::convertToDto);
    }

	@Override
	public ModuleResponse getModuleById(String moduleId) {
		CourseModule module = moduleRepository.findById(moduleId)
				.orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + moduleId));

		return convertToDto(module);
	}
	
	@Override
    @Transactional
    public ModuleResponse updateModule(String moduleId, ModuleUpdateRequest request) {
        CourseModule existingModule = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + moduleId));
        
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + request.getDepartmentId()));

        existingModule.setModuleName(request.getModuleName());
        existingModule.setDepartment(department);

        CourseModule updatedModule = moduleRepository.save(existingModule);
        return convertToDto(updatedModule);
    }

	@Override
    public void deleteModule(String moduleId) {
        // First, check if the module exists at all
        if (!moduleRepository.existsById(moduleId)) {
            throw new ResourceNotFoundException("Module not found with id: " + moduleId);
        }

        // Now, check for dependencies before deleting
        if (examRepository.existsByModule_ModuleId(moduleId)) {
            throw new ConflictException("Cannot delete module. It is in use by one or more exams.");
        }
        if (timetableEntryRepository.existsByModule_ModuleId(moduleId)) {
            throw new ConflictException("Cannot delete module. It is in use by one or more timetable entries.");
        }

        // If no dependencies are found, proceed with deletion
        moduleRepository.deleteById(moduleId);
    }

	private ModuleResponse convertToDto(CourseModule module) {
		ModuleResponse dto = new ModuleResponse();
		dto.setModuleId(module.getModuleId());
		dto.setModuleName(module.getModuleName());
		// This safely triggers the lazy loading for the department
		if (module.getDepartment() != null) {
			dto.setDepartmentName(module.getDepartment().getDepartmentName());
		}
		return dto;
	}
}