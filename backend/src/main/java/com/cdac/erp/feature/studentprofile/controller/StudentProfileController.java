package com.cdac.erp.feature.studentprofile.controller;

import com.cdac.erp.feature.student.dto.StudentResponse;
import com.cdac.erp.feature.studentprofile.service.IStudentProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/profile")
public class StudentProfileController {

    @Autowired
    private IStudentProfileService studentProfileService;

    @GetMapping
    public ResponseEntity<StudentResponse> getMyProfile(Authentication authentication) {
        String studentPrn = authentication.getName();
        StudentResponse studentProfile = studentProfileService.getStudentProfile(studentPrn);
        return ResponseEntity.ok(studentProfile);
    }
}