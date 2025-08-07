package com.cdac.erp.core.repository;

import com.cdac.erp.core.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

	@Query("SELECT a FROM Admin a WHERE a.email = :email")
	Optional<Admin> findAdminByEmailAddress(@Param("email") String email); 
}