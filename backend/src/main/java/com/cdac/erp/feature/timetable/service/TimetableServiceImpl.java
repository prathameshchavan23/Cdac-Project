package com.cdac.erp.feature.timetable.service;

import com.cdac.erp.common.exception.ConflictException;
import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Instructor;
import com.cdac.erp.core.model.CourseModule;
import com.cdac.erp.core.model.Student;
import com.cdac.erp.core.model.TimetableEntry;
import com.cdac.erp.core.repository.AttendanceRepository;
import com.cdac.erp.core.repository.InstructorRepository;
import com.cdac.erp.core.repository.CourseModuleRepository;
import com.cdac.erp.core.repository.StudentRepository;
import com.cdac.erp.core.repository.TimetableEntryRepository;
import com.cdac.erp.feature.notification.service.IEmailService;
import com.cdac.erp.feature.timetable.dto.TimetableEntryRequest;
import com.cdac.erp.feature.timetable.dto.TimetableEntryResponse;
import com.cdac.erp.feature.timetable.dto.TimetableEntryUpdateRequest;

import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimetableServiceImpl implements ITimetableService {

	@Autowired
	private TimetableEntryRepository timetableEntryRepository;

	@Autowired
	private CourseModuleRepository moduleRepository;

	@Autowired
	private InstructorRepository instructorRepository;

	@Autowired
	private AttendanceRepository attendanceRepository;

	// email
	@Autowired
	private IEmailService emailService;
	@Autowired
	private StudentRepository studentRepository;

	@Override
	public TimetableEntryResponse createTimetableEntry(TimetableEntryRequest request) {
		CourseModule module = moduleRepository.findById(request.getModuleId())
				.orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + request.getModuleId()));

		Instructor instructor = instructorRepository.findById(request.getInstructorId()).orElseThrow(
				() -> new ResourceNotFoundException("Instructor not found with id: " + request.getInstructorId()));

		TimetableEntry entry = new TimetableEntry();

		entry.setModule(module);
		entry.setInstructor(instructor);
		entry.setLectureDate(request.getLectureDate());
		entry.setStartTime(request.getStartTime());
		entry.setEndTime(request.getEndTime());
		entry.setDayOfWeek(request.getDayOfWeek());
		entry.setRoomNumber(request.getRoomNumber());
//		entry.setLab(request.isLab());
		entry.setIsLab(request.isLab());

		TimetableEntry savedEntry = timetableEntryRepository.save(entry);
//		notifyStudents("New Timetable Published", "A new class has been scheduled. Please check the updated timetable.");

		return convertToDto(savedEntry);
	}

	@Override
	public List<TimetableEntryResponse> getAllTimetableEntries() {
		return timetableEntryRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
	}

//	@Override
//	@Transactional
//	public TimetableEntryResponse updateTimetableEntry(Integer id, TimetableEntryUpdateRequest request) {
//		TimetableEntry existingEntry = timetableEntryRepository.findById(id)
//				.orElseThrow(() -> new ResourceNotFoundException("Timetable entry not found with id: " + id));
//
//		CourseModule module = moduleRepository.findById(request.getModuleId())
//				.orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + request.getModuleId()));
//
//		Instructor instructor = instructorRepository.findById(request.getInstructorId()).orElseThrow(
//				() -> new ResourceNotFoundException("Instructor not found with id: " + request.getInstructorId()));
//
//		existingEntry.setModule(module);
//		existingEntry.setInstructor(instructor);
//		existingEntry.setLectureDate(request.getLectureDate());
//		existingEntry.setStartTime(request.getStartTime());
//		existingEntry.setEndTime(request.getEndTime());
//		existingEntry.setDayOfWeek(request.getDayOfWeek());
//		existingEntry.setRoomNumber(request.getRoomNumber());
//		existingEntry.setIsLab(request.isLab());
//
//		TimetableEntry updatedEntry = timetableEntryRepository.save(existingEntry);
////		notifyStudents("Timetable Updated", "A class in your schedule has been updated. Please check the timetable.");
//		return convertToDto(updatedEntry);
//	}

	@Override
	public void deleteTimetableEntry(Integer id) {
		if (!timetableEntryRepository.existsById(id)) {
			throw new ResourceNotFoundException("Timetable entry not found with id: " + id);
		}

		// Dependency Check
		if (attendanceRepository.existsByTimetableEntry_TimetableEntryId(id)) {
			throw new ConflictException("Cannot delete timetable entry. It has attendance records associated with it.");
		}

		timetableEntryRepository.deleteById(id);

//		notifyStudents("Timetable Updated", "A class has been removed from the schedule. Please check the updated timetable.");

	}

	// sending mail
	@Override
	public void sendTimetableNotification(String subject, String message) {
		notifyStudents(subject, message);
	}

	// helper for mail
	private void notifyStudents(String subject, String text) {
		List<Student> students = studentRepository.findAll();
		for (Student student : students) {
			// In a real application, you might send emails in a batch or asynchronously
			emailService.sendSimpleMessage(student.getEmail(), subject, text);
		}
	}

	@Override
	public List<TimetableEntryResponse> getEntriesByDate(LocalDate date) {
		List<TimetableEntry> entries = timetableEntryRepository.findByLectureDate(date);
		return entries.stream().map(this::convertToDto).collect(Collectors.toList());
	}

	private TimetableEntryResponse convertToDto(TimetableEntry entry) {
		TimetableEntryResponse dto = new TimetableEntryResponse();
		dto.setTimetableEntryId(entry.getTimetableEntryId());
		dto.setLectureDate(entry.getLectureDate());
		dto.setStartTime(entry.getStartTime());
		dto.setEndTime(entry.getEndTime());
		dto.setDayOfWeek(entry.getDayOfWeek());
		dto.setRoomNumber(entry.getRoomNumber());
		dto.setIsLab(entry.getIsLab());
		if (entry.getModule() != null) {
			dto.setModuleId(entry.getModule().getModuleId());
			dto.setModuleName(entry.getModule().getModuleName());
		}
		if (entry.getInstructor() != null) {
			dto.setInstructorId(entry.getInstructor().getInstructorId());
			dto.setInstructorName(entry.getInstructor().getFirstName() + " " + entry.getInstructor().getLastName());
		}
		return dto;
	}
}