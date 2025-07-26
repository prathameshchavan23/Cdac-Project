package com.cdac.erp.feature.module.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModuleCreateRequest {

    @NotBlank(message = "Module ID is required")
    private String moduleId;

    @NotBlank(message = "Module name is required")
    private String moduleName;

    @NotNull(message = "Department ID is required")
    private Integer departmentId;
}