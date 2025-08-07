package com.cdac.erp.feature.studentattendance.service;

import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Attendance;
import com.cdac.erp.core.model.Student;
import com.cdac.erp.core.model.TimetableEntry;
import com.cdac.erp.core.repository.AttendanceRepository;
import com.cdac.erp.core.repository.StudentRepository;
import com.cdac.erp.core.repository.TimetableEntryRepository;
import com.cdac.erp.feature.studentattendance.dto.DailyAttendanceResponseDto;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentAttendanceServiceImpl implements IStudentAttendanceService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private TimetableEntryRepository timetableEntryRepository;
    @Autowired private AttendanceRepository attendanceRepository;

    @Override
    public List<DailyAttendanceResponseDto> getDailyAttendance(String studentPrn, LocalDate date) {
        Student student = studentRepository.findById(studentPrn)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with prn: " + studentPrn));

        // Get all scheduled classes for the student's department on the given date
        List<TimetableEntry> scheduleForDay = timetableEntryRepository
                .findByModule_Department_DepartmentIdAndLectureDateOrderByStartTimeAsc(student.getDepartment().getDepartmentId(), date);

        // Get the student's attendance records for that day for efficient lookup
        Map<Integer, Attendance> attendanceMap = attendanceRepository
                .findByStudent_PrnAndAttendanceDate(studentPrn, date).stream()
                .collect(Collectors.toMap(att -> att.getTimetableEntry().getTimetableEntryId(), att -> att));

        // Map the schedule to the response DTO, merging in the attendance status
        return scheduleForDay.stream().map(session -> {
        	
            String status;
            Attendance attendanceRecord = attendanceMap.get(session.getTimetableEntryId());
            
            if (attendanceRecord != null) {
                status = attendanceRecord.getPresent() ? "Present" : "Absent";
            } else {
                // If no record exists, check the date.
                if (session.getLectureDate().isBefore(LocalDate.now())) {
                    // For past dates with no record, mark as Absent.
                    status = "Absent";
                } else {
                    // For today or future dates with no record, it's Upcoming.
                    status = "Upcoming";
                }
            }
            
            return new DailyAttendanceResponseDto(
                session.getModule().getModuleId(),
                session.getModule().getModuleName(),
                status,
                session.getStartTime()
            );
        }).collect(Collectors.toList());
    }
}
