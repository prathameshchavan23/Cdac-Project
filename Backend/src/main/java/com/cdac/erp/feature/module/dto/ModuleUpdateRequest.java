package com.cdac.erp.feature.module.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModuleUpdateRequest {

    @NotBlank(message = "Module name is required")
    private String moduleName;

    @NotNull(message = "Department ID is required")
    private Integer departmentId;
}