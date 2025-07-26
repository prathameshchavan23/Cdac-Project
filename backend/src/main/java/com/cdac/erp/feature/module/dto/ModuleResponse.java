package com.cdac.erp.feature.module.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModuleResponse {
    private String moduleId;
    private String moduleName;
    private String departmentName; // We only need the department's name
}