package com.cdac.erp.feature.studentattendance.controller;

import com.cdac.erp.feature.studentattendance.dto.DailyAttendanceResponseDto;
import com.cdac.erp.feature.studentattendance.service.IStudentAttendanceService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/attendance")
public class StudentAttendanceController {

    // --- CHANGE: Rename the variable to match its type ---
    @Autowired
    private IStudentAttendanceService studentAttendanceService;

    @GetMapping("/by-date")
    public ResponseEntity<List<DailyAttendanceResponseDto>> getMyAttendanceByDate(
            Authentication authentication,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        String studentPrn = authentication.getName();
        List<DailyAttendanceResponseDto> attendance = studentAttendanceService.getDailyAttendance(studentPrn, date);
        return ResponseEntity.ok(attendance);
    }
}