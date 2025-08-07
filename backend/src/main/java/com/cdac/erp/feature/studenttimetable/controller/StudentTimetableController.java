package com.cdac.erp.feature.studenttimetable.controller;

import com.cdac.erp.feature.studenttimetable.service.IStudentTimetableService;
import com.cdac.erp.feature.timetable.dto.TimetableEntryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/student/timetable")
public class StudentTimetableController {

    @Autowired
    private IStudentTimetableService studentTimetableService;

    @GetMapping("/upcoming")
    public ResponseEntity<List<TimetableEntryResponse>> getUpcomingTimetable(Authentication authentication) {
        String studentPrn = authentication.getName();
        List<TimetableEntryResponse> upcomingEntries = studentTimetableService.getUpcomingTimetable(studentPrn);
        return ResponseEntity.ok(upcomingEntries);
    }
}
