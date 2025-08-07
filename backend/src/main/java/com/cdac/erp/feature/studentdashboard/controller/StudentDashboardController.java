package com.cdac.erp.feature.studentdashboard.controller;

// --- CHANGE: Import the correct DTO from the new package ---
import com.cdac.erp.feature.studentfeedback.dto.ActiveSessionResponse;
import com.cdac.erp.feature.student.service.IStudentService;
import com.cdac.erp.feature.studentdashboard.dto.StudentDashboardStatsDto;
import com.cdac.erp.feature.studentdashboard.dto.TodaysClassResponseDto;
import com.cdac.erp.feature.studentdashboard.service.IStudentDashboardService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/dashboard")
public class StudentDashboardController {

    @Autowired
    private IStudentDashboardService studentDashboardService;
    
    @Autowired
    private IStudentService studentService; 

    @GetMapping("/stats")
    public ResponseEntity<StudentDashboardStatsDto> getDashboardStats(Authentication authentication) {
        String studentPrn = authentication.getName();
        StudentDashboardStatsDto stats = studentDashboardService.getStudentDashboardStats(studentPrn);
        return ResponseEntity.ok(stats);
    }

//    @GetMapping("/todays-classes")
//    public ResponseEntity<List<TodaysClassResponseDto>> getTodaysClasses(Authentication authentication) {
//        String studentPrn = authentication.getName();
//        List<TodaysClassResponseDto> todaysClasses = studentDashboardService.getTodaysClasses(studentPrn);
//        return ResponseEntity.ok(todaysClasses);
//    }

    @GetMapping("/pending-feedback")
    public ResponseEntity<List<ActiveSessionResponse>> getPendingFeedbackTasks(Authentication authentication) {
        String studentPrn = authentication.getName();
        List<ActiveSessionResponse> pendingTasks = studentService.getPendingFeedbackTasks(studentPrn);
        return ResponseEntity.ok(pendingTasks);
    }
}