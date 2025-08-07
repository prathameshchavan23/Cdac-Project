package com.cdac.erp.feature.timetable.controller;

import com.cdac.erp.feature.timetable.dto.TimetableEntryRequest;
import com.cdac.erp.feature.timetable.dto.TimetableEntryResponse;
import com.cdac.erp.feature.timetable.dto.TimetableEntryUpdateRequest;
import com.cdac.erp.feature.timetable.dto.TimetableNotificationRequest;
import com.cdac.erp.feature.timetable.service.ITimetableService;

import jakarta.validation.Valid;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/timetable")
public class TimetableController {

    @Autowired
    private ITimetableService timetableService;

    @PostMapping
    public ResponseEntity<TimetableEntryResponse> createTimetableEntry(@Valid @RequestBody TimetableEntryRequest request) { // Changed return type
        TimetableEntryResponse newEntryDto = timetableService.createTimetableEntry(request);
        return new ResponseEntity<>(newEntryDto, HttpStatus.CREATED);
    }
    
//    @PutMapping("/{id}")
//    public ResponseEntity<TimetableEntryResponse> updateTimetableEntry(@PathVariable Integer id, @Valid @RequestBody TimetableEntryUpdateRequest request) {
//        TimetableEntryResponse updatedEntry = timetableService.updateTimetableEntry(id, request);
//        return ResponseEntity.ok(updatedEntry);
//    }

    @GetMapping
    public List<TimetableEntryResponse> getAllTimetableEntries() {
        return timetableService.getAllTimetableEntries();
    }
    
    @GetMapping("/today")
    public ResponseEntity<List<TimetableEntryResponse>> getTodaysEntries() {
        // It now calls the generic method with today's date
        List<TimetableEntryResponse> entries = timetableService.getEntriesByDate(LocalDate.now());
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<TimetableEntryResponse>> getEntriesByDate(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<TimetableEntryResponse> entries = timetableService.getEntriesByDate(date);
        return ResponseEntity.ok(entries);
    }
    
    //notification
    @PostMapping("/notify")
    public ResponseEntity<Void> notifyStudents(@Valid @RequestBody TimetableNotificationRequest request) {
        timetableService.sendTimetableNotification(request.getSubject(), request.getMessage());
        return ResponseEntity.ok().build();
    }
}