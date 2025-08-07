package com.cdac.erp.core.repository;

import com.cdac.erp.core.model.Attendance;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
	
    List<Attendance> findByTimetableEntry_TimetableEntryId(Integer timetableEntryId);
    Optional<Attendance> findByStudent_PrnAndTimetableEntry_TimetableEntryIdAndAttendanceDate(String prn, Integer timetableEntryId, LocalDate date);
    Page<Attendance> findByTimetableEntry_TimetableEntryId(Integer timetableEntryId, Pageable pageable);
    List<Attendance> findByStudent_PrnAndAttendanceDate(String prn, LocalDate date);
    // ensure we don't delete a timetable entry that has attendance records associated with it.
    boolean existsByTimetableEntry_TimetableEntryId(Integer timetableEntryId);
    //date filter
    Page<Attendance> findByTimetableEntry_TimetableEntryIdAndAttendanceDate(Integer timetableEntryId, LocalDate date, Pageable pageable);
    
    @Query("SELECT count(a) FROM Attendance a WHERE a.student.prn = :prn")
    long countByStudentPrn(@Param("prn") String prn);

    // Change a.isPresent to a.present in this query
    @Query("SELECT count(a) FROM Attendance a WHERE a.student.prn = :prn AND a.present = :isPresent")
    long countByStudentPrnAndIsPresent(@Param("prn") String prn, @Param("isPresent") boolean isPresent);
    
}