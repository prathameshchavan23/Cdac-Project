package com.cdac.erp.feature.studentmarks.controller;

import com.cdac.erp.feature.grades.dto.ScoreResponse;
import com.cdac.erp.feature.studentmarks.service.IStudentMarksService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/my-marks")
public class StudentMarksController {

    @Autowired
    private IStudentMarksService studentMarksService;

    @GetMapping
    public ResponseEntity<List<ScoreResponse>> getMyMarks(Authentication authentication) {
        String studentPrn = authentication.getName();
        List<ScoreResponse> marks = studentMarksService.getMyMarks(studentPrn);
        return ResponseEntity.ok(marks);
    }
}