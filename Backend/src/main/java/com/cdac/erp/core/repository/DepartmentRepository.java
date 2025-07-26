package com.cdac.erp.core.repository;

import com.cdac.erp.core.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    //TODO custom query method.
}