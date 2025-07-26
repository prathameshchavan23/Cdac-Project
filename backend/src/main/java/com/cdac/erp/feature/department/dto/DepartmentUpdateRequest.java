package com.cdac.erp.feature.department.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentUpdateRequest {

    @NotBlank(message = "Department name cannot be empty")
    private String departmentName;
}