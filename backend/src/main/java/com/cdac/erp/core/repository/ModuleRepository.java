package com.cdac.erp.core.repository;

import com.cdac.erp.core.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleRepository extends JpaRepository<Module, String> {
	long countByDepartment_DepartmentId(Integer departmentId);
}