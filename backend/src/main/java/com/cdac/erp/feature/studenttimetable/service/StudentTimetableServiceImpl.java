package com.cdac.erp.feature.studenttimetable.service;

import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Student;
import com.cdac.erp.core.model.TimetableEntry;
import com.cdac.erp.core.repository.StudentRepository;
import com.cdac.erp.core.repository.TimetableEntryRepository;
import com.cdac.erp.feature.timetable.dto.TimetableEntryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentTimetableServiceImpl implements IStudentTimetableService {

    @Autowired private TimetableEntryRepository timetableEntryRepository;
    @Autowired private StudentRepository studentRepository;

    @Override
    public List<TimetableEntryResponse> getUpcomingTimetable(String studentPrn) {
        Student student = studentRepository.findById(studentPrn)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentPrn));

        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(6); // Today + next 6 days = 7 total days

        List<TimetableEntry> entries = timetableEntryRepository
                .findByModule_Department_DepartmentIdAndLectureDateBetweenOrderByLectureDateAscStartTimeAsc(
                        student.getDepartment().getDepartmentId(),
                        startDate,
                        endDate
                );
        
        return entries.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private TimetableEntryResponse convertToDto(TimetableEntry entry) {
        // This helper function maps the database entity to a clean data object for the frontend
        TimetableEntryResponse dto = new TimetableEntryResponse();
        dto.setTimetableEntryId(entry.getTimetableEntryId());
        dto.setModuleId(entry.getModule().getModuleId());
        dto.setModuleName(entry.getModule().getModuleName());
        dto.setInstructorId(entry.getInstructor().getInstructorId());
        dto.setInstructorName(entry.getInstructor().getFirstName() + " " + entry.getInstructor().getLastName());
        dto.setLectureDate(entry.getLectureDate());
        dto.setStartTime(entry.getStartTime());
        dto.setEndTime(entry.getEndTime());
        dto.setDayOfWeek(entry.getDayOfWeek());
        dto.setRoomNumber(entry.getRoomNumber());
        dto.setIsLab(entry.getIsLab());
        return dto;
    }
}
