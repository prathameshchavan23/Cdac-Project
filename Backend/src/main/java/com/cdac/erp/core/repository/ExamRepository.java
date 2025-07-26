package com.cdac.erp.core.repository;

import com.cdac.erp.core.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Integer> {
	//checking if module is associated with others
	boolean existsByModule_ModuleId(String moduleId);
}