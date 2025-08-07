package com.cdac.erp.core.repository;

import com.cdac.erp.core.model.TimetableEntry;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimetableEntryRepository extends JpaRepository<TimetableEntry, Integer> {
	boolean existsByModule_ModuleId(String moduleId);

	boolean existsByInstructor_InstructorId(Integer instructorId);

	List<TimetableEntry> findByLectureDate(LocalDate date);

	List<TimetableEntry> findByModule_Department_DepartmentIdAndLectureDateOrderByStartTimeAsc(Integer departmentId,
			LocalDate date);

	/**
	 * Finds all timetable entries for a specific department between two dates,
	 * ordered first by the lecture date and then by the start time.
	 */
	List<TimetableEntry> findByModule_Department_DepartmentIdAndLectureDateBetweenOrderByLectureDateAscStartTimeAsc(
			Integer departmentId, LocalDate startDate, LocalDate endDate);
}