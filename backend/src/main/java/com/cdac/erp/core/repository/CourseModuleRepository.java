package com.cdac.erp.core.repository;

import com.cdac.erp.core.model.CourseModule;
import com.cdac.erp.core.model.Student;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseModuleRepository extends JpaRepository<CourseModule, String> {
	
	long countByDepartment_DepartmentId(Integer departmentId);
	
	Page<Student> findByDepartment_DepartmentId(Integer departmentId, Pageable pageable);
}