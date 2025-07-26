package com.cdac.erp.feature.department.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class DepartmentCreateRequest {
	
	@NotBlank(message = "Department name cannot be empty or null")
    private String departmentName;
}