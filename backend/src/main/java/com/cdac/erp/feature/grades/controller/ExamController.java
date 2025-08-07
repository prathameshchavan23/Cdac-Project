package com.cdac.erp.feature.grades.controller;

import com.cdac.erp.feature.grades.dto.ExamRequest;
import com.cdac.erp.feature.grades.dto.ExamResponse;
import com.cdac.erp.feature.grades.service.IExamService;
import jakarta.validation.Valid; // Add this import
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/exams")
public class ExamController {

    @Autowired
    private IExamService examService;

    @PostMapping
    public ResponseEntity<ExamResponse> createExam(@Valid @RequestBody ExamRequest request) {
        ExamResponse newExam = examService.createExam(request);
        return new ResponseEntity<>(newExam, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ExamResponse>> getAllExams() {
        List<ExamResponse> exams = examService.getAllExams();
        return ResponseEntity.ok(exams);
    }
    
    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<ExamResponse>> getExamsByModule(@PathVariable String moduleId) {
        List<ExamResponse> exams = examService.getExamsByModule(moduleId);
        return ResponseEntity.ok(exams);
    }
}