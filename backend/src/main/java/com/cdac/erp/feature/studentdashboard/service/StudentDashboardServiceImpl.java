package com.cdac.erp.feature.studentdashboard.service;

import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Attendance;
import com.cdac.erp.core.model.Student;
import com.cdac.erp.core.model.TimetableEntry;
import com.cdac.erp.core.repository.AttendanceRepository;
import com.cdac.erp.core.repository.CourseModuleRepository;
import com.cdac.erp.core.repository.StudentRepository;
import com.cdac.erp.core.repository.TimetableEntryRepository;
import com.cdac.erp.feature.studentdashboard.dto.StudentDashboardStatsDto;
import com.cdac.erp.feature.studentdashboard.dto.TodaysClassResponseDto;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentDashboardServiceImpl implements IStudentDashboardService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private CourseModuleRepository moduleRepository;
    @Autowired private AttendanceRepository attendanceRepository;
    @Autowired private TimetableEntryRepository timetableEntryRepository;

    @Override
    public StudentDashboardStatsDto getStudentDashboardStats(String studentPrn) {
        Student student = studentRepository.findById(studentPrn)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with prn: " + studentPrn));
        long totalCourses = moduleRepository.countByDepartment_DepartmentId(student.getDepartment().getDepartmentId());
        long totalAttendanceRecords = attendanceRepository.countByStudentPrn(studentPrn);
        long presentRecords = attendanceRepository.countByStudentPrnAndIsPresent(studentPrn, true);
        double attendancePercentage = 0;
        if (totalAttendanceRecords > 0) {
            attendancePercentage = ((double) presentRecords / totalAttendanceRecords) * 100;
        }
        return new StudentDashboardStatsDto(totalCourses, attendancePercentage);
    }

//    @Override
//    public List<TodaysClassResponseDto> getTodaysClasses(String studentPrn) {
//    	
//        Student student = studentRepository.findById(studentPrn)
//                .orElseThrow(() -> new ResourceNotFoundException("Student not found with prn: " + studentPrn));
//        
//        LocalDate today = LocalDate.now();
//        
//        List<TimetableEntry> todaysSchedule = timetableEntryRepository
//                .findByModule_Department_DepartmentIdAndLectureDateOrderByStartTimeAsc(student.getDepartment().getDepartmentId(), today);
//        
//        Map<Integer, Attendance> todaysAttendanceMap = attendanceRepository
//                .findByStudent_PrnAndAttendanceDate(studentPrn, today).stream()
//                .collect(Collectors.toMap(att -> att.getTimetableEntry().getTimetableEntryId(), att -> att));
//        
//        return todaysSchedule.stream().map(session -> {
//            String status = "Upcoming";
//            Attendance attendanceRecord = todaysAttendanceMap.get(session.getTimetableEntryId());
//            if (attendanceRecord != null) {
//                status = attendanceRecord.getPresent() ? "Attended" : "Absent";
//            }
//            return new TodaysClassResponseDto(
//                session.getModule().getModuleName(),
//                session.getStartTime(),
//                session.getEndTime(),
//                status
//            );
//        }).collect(Collectors.toList());
//    }
}