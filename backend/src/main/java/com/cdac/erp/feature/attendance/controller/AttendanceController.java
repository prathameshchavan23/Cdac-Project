package com.cdac.erp.feature.attendance.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import com.cdac.erp.feature.attendance.dto.AttendanceRequest;
import com.cdac.erp.feature.attendance.dto.AttendanceResponse;
import com.cdac.erp.feature.attendance.dto.AttendanceUpdateRequest;
import com.cdac.erp.feature.attendance.dto.BulkAttendanceRequest;
import com.cdac.erp.feature.attendance.service.IAttendanceService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/attendance")
public class AttendanceController {

	@Autowired
	private IAttendanceService attendanceService;

	@PostMapping
	public ResponseEntity<AttendanceResponse> markAttendance(@Valid @RequestBody AttendanceRequest request) {
		AttendanceResponse newAttendance = attendanceService.markAttendance(request);
		return new ResponseEntity<>(newAttendance, HttpStatus.CREATED);
	}

	@PostMapping("/bulk") // Changed to a unique sub-path
	public ResponseEntity<Void> markBulkAttendance(@Valid @RequestBody BulkAttendanceRequest request) {
		attendanceService.markBulkAttendance(request);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/session/{timetableEntryId}")
	public ResponseEntity<Page<AttendanceResponse>> getAttendanceForSession(@PathVariable Integer timetableEntryId,
			Pageable pageable) {
		Page<AttendanceResponse> attendancePage = attendanceService.getAttendanceForSession(timetableEntryId, pageable);
		return ResponseEntity.ok(attendancePage);
	}

	// New endpoint for fetching by date
	@GetMapping("/session/{timetableEntryId}/by-date")
	public ResponseEntity<Page<AttendanceResponse>> getAttendanceForSessionAndDate(
			@PathVariable Integer timetableEntryId,
			@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date, Pageable pageable) {

		Page<AttendanceResponse> attendancePage = attendanceService.getAttendanceForSessionAndDate(timetableEntryId,
				date, pageable);
		return ResponseEntity.ok(attendancePage);
	}

	@PutMapping("/{attendanceId}")
	public ResponseEntity<AttendanceResponse> updateAttendance(@PathVariable Integer attendanceId,
			@Valid @RequestBody AttendanceUpdateRequest request) {
		AttendanceResponse updatedAttendance = attendanceService.updateAttendance(attendanceId, request);
		return ResponseEntity.ok(updatedAttendance);
	}

	@DeleteMapping("/{attendanceId}")
	public ResponseEntity<Void> deleteAttendance(@PathVariable Integer attendanceId) {
		attendanceService.deleteAttendance(attendanceId);
		return ResponseEntity.noContent().build();
	}

}