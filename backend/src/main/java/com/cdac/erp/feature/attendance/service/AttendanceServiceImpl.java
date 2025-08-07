package com.cdac.erp.feature.attendance.service;

import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Attendance;
import com.cdac.erp.core.model.Student;
import com.cdac.erp.core.model.TimetableEntry;
import com.cdac.erp.core.repository.AttendanceRepository;
import com.cdac.erp.core.repository.StudentRepository;
import com.cdac.erp.core.repository.TimetableEntryRepository;
import com.cdac.erp.feature.attendance.dto.AttendanceRequest;
import com.cdac.erp.feature.attendance.dto.AttendanceResponse;
import com.cdac.erp.feature.attendance.dto.AttendanceUpdateRequest;
import com.cdac.erp.feature.attendance.dto.BulkAttendanceRequest;
import com.cdac.erp.feature.attendance.dto.StudentAttendanceDto;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AttendanceServiceImpl implements IAttendanceService {

    @Autowired private AttendanceRepository attendanceRepository;
    @Autowired private StudentRepository studentRepository;
    @Autowired private TimetableEntryRepository timetableEntryRepository;

    @Override
    public AttendanceResponse markAttendance(AttendanceRequest request) {
        Student student = studentRepository.findById(request.getStudentPrn())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with prn: " + request.getStudentPrn()));

        TimetableEntry timetableEntry = timetableEntryRepository.findById(request.getTimetableEntryId())
                .orElseThrow(() -> new ResourceNotFoundException("Timetable entry not found with id: " + request.getTimetableEntryId()));

        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setTimetableEntry(timetableEntry);
        attendance.setAttendanceDate(request.getAttendanceDate());
        attendance.setPresent(request.getPresent());
        attendance.setAttendedHours(request.getAttendedHours());

        Attendance savedAttendance = attendanceRepository.save(attendance);
        return convertToDto(savedAttendance);
    }

    @Override
    @Transactional
    public void markBulkAttendance(BulkAttendanceRequest request) {
        TimetableEntry timetableEntry = timetableEntryRepository.findById(request.getTimetableEntryId())
                .orElseThrow(() -> new ResourceNotFoundException("Timetable entry not found with id: " + request.getTimetableEntryId()));

        for (StudentAttendanceDto studentAttendance : request.getAttendances()) {
            Student student = studentRepository.findById(studentAttendance.getStudentPrn())
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found with prn: " + studentAttendance.getStudentPrn()));
            
            Attendance attendance = attendanceRepository
                .findByStudent_PrnAndTimetableEntry_TimetableEntryIdAndAttendanceDate(
                    student.getPrn(), timetableEntry.getTimetableEntryId(), request.getAttendanceDate())
                .orElse(new Attendance());

            attendance.setStudent(student);
            attendance.setTimetableEntry(timetableEntry);
            attendance.setAttendanceDate(request.getAttendanceDate());
            attendance.setPresent(studentAttendance.getIsPresent());

            attendanceRepository.save(attendance);
        }
    }

    @Override
    public Page<AttendanceResponse> getAttendanceForSession(Integer timetableEntryId, Pageable pageable) {
        if (!timetableEntryRepository.existsById(timetableEntryId)) {
            throw new ResourceNotFoundException("Timetable entry not found with id: " + timetableEntryId);
        }
        Page<Attendance> attendancePage = attendanceRepository.findByTimetableEntry_TimetableEntryId(timetableEntryId, pageable);
        return attendancePage.map(this::convertToDto);
    }

    @Override
    public Page<AttendanceResponse> getAttendanceForSessionAndDate(Integer timetableEntryId, LocalDate date, Pageable pageable) {
        Page<Attendance> attendancePage = attendanceRepository
                .findByTimetableEntry_TimetableEntryIdAndAttendanceDate(timetableEntryId, date, pageable);
        return attendancePage.map(this::convertToDto);
    }

    @Override
    @Transactional
    public AttendanceResponse updateAttendance(Integer attendanceId, AttendanceUpdateRequest request) {
        Attendance existingAttendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance record not found with id: " + attendanceId));

        existingAttendance.setPresent(request.getPresent());
        existingAttendance.setAttendedHours(request.getAttendedHours());

        Attendance updatedAttendance = attendanceRepository.save(existingAttendance);
        return convertToDto(updatedAttendance);
    }

    @Override
    public void deleteAttendance(Integer attendanceId) {
        if (!attendanceRepository.existsById(attendanceId)) {
            throw new ResourceNotFoundException("Attendance record not found with id: " + attendanceId);
        }
        attendanceRepository.deleteById(attendanceId);
    }

    private AttendanceResponse convertToDto(Attendance attendance) {
        AttendanceResponse dto = new AttendanceResponse();
        dto.setAttendanceId(attendance.getAttendanceId());
        dto.setAttendanceDate(attendance.getAttendanceDate());
        dto.setPresent(attendance.getPresent());
        dto.setAttendedHours(attendance.getAttendedHours());

        if (attendance.getStudent() != null) {
            dto.setStudentPrn(attendance.getStudent().getPrn());
            dto.setStudentName(attendance.getStudent().getFirstName() + " " + attendance.getStudent().getLastName());
        }

        if (attendance.getTimetableEntry() != null) {
            dto.setTimetableEntryId(attendance.getTimetableEntry().getTimetableEntryId());
            if (attendance.getTimetableEntry().getModule() != null) {
                dto.setModuleName(attendance.getTimetableEntry().getModule().getModuleName());
            }
        }
        return dto;
    }
}