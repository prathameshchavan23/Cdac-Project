package com.cdac.erp.feature.module.controller;

import com.cdac.erp.core.model.CourseModule;
import jakarta.validation.Valid;
import com.cdac.erp.feature.module.dto.ModuleCreateRequest;
import com.cdac.erp.feature.module.dto.ModuleResponse;
import com.cdac.erp.feature.module.dto.ModuleUpdateRequest;
import com.cdac.erp.feature.module.service.IModuleService;
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
@RequestMapping("/api/admin/modules")
public class ModuleController {

	@Autowired
	private IModuleService moduleService;

	@PostMapping
	public ResponseEntity<ModuleResponse> createModule(@Valid @RequestBody ModuleCreateRequest createRequest) {
	    ModuleResponse newModule = moduleService.createModule(createRequest);
	    return new ResponseEntity<>(newModule, HttpStatus.CREATED);
	}

//	@GetMapping
//	public List<ModuleResponse> getAllModules() {
//		return moduleService.getAllModules();
//	}
	
	@GetMapping
	public ResponseEntity<Page<ModuleResponse>> getAllModules(Pageable pageable) {
	    Page<ModuleResponse> modules = moduleService.getAllModules(pageable);
	    return ResponseEntity.ok(modules);
	}

	@GetMapping("/{moduleId}")
	public ModuleResponse getModuleById(@PathVariable String moduleId) {
		return moduleService.getModuleById(moduleId);
	}

	@PutMapping("/{moduleId}")
	public ResponseEntity<ModuleResponse> updateModule(@PathVariable String moduleId,
			@Valid @RequestBody ModuleUpdateRequest request) {
		ModuleResponse updatedModule = moduleService.updateModule(moduleId, request);
		return ResponseEntity.ok(updatedModule);
	}

	@DeleteMapping("/{moduleId}")
    public ResponseEntity<Void> deleteModule(@PathVariable String moduleId) {
        moduleService.deleteModule(moduleId);
        return ResponseEntity.noContent().build();
    }
}
