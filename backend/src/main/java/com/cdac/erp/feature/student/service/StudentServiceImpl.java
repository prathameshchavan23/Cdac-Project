package com.cdac.erp.feature.student.service;

import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Attendance;
import com.cdac.erp.core.model.CourseModule;
import com.cdac.erp.core.model.Department;
import com.cdac.erp.core.model.FeedbackSession;
import com.cdac.erp.core.model.Score;
import com.cdac.erp.core.model.Student;
import com.cdac.erp.core.repository.AttendanceRepository;
import com.cdac.erp.core.repository.DepartmentRepository;
import com.cdac.erp.core.repository.FeedbackSessionRepository;
import com.cdac.erp.core.repository.CourseModuleRepository;
import com.cdac.erp.core.repository.ScoreRepository;
import com.cdac.erp.core.repository.StudentRepository;
import com.cdac.erp.feature.grades.dto.ScoreResponse;
//import com.cdac.erp.feature.student.dto.StudentAttendanceSummaryDto;
import com.cdac.erp.feature.student.dto.StudentCreateRequest;
import com.cdac.erp.feature.student.dto.StudentResponse;
import com.cdac.erp.feature.student.dto.StudentUpdateRequest;
import com.cdac.erp.feature.studentfeedback.dto.ActiveSessionResponse;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentServiceImpl implements IStudentService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private DepartmentRepository departmentRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private ScoreRepository scoreRepository;
    @Autowired private AttendanceRepository attendanceRepository;
    @Autowired private CourseModuleRepository courseModuleRepository;
    @Autowired private FeedbackSessionRepository feedbackSessionRepository;

    @Override
    public StudentResponse createStudent(StudentCreateRequest createRequest) {
        Department department = departmentRepository.findById(createRequest.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + createRequest.getDepartmentId()));

        Student student = new Student();
        student.setPrn(createRequest.getPrn());
        student.setFirstName(createRequest.getFirstName());
        student.setLastName(createRequest.getLastName());
        student.setEmail(createRequest.getEmail());
        student.setPhoneNumber(createRequest.getPhoneNumber());
        student.setDateOfBirth(createRequest.getDateOfBirth());
        student.setAddress(createRequest.getAddress());
        student.setDepartment(department);
        student.setPasswordHash(passwordEncoder.encode(createRequest.getPassword()));

        Student savedStudent = studentRepository.save(student);
        return convertToDto(savedStudent);
    }

    @Override
    @Transactional
    public StudentResponse updateStudent(String prn, StudentUpdateRequest updateRequest) {
        Student existingStudent = studentRepository.findById(prn)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with prn: " + prn));
        Department department = departmentRepository.findById(updateRequest.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + updateRequest.getDepartmentId()));

        existingStudent.setFirstName(updateRequest.getFirstName());
        existingStudent.setLastName(updateRequest.getLastName());
        existingStudent.setEmail(updateRequest.getEmail());
        existingStudent.setPhoneNumber(updateRequest.getPhoneNumber());
        existingStudent.setDateOfBirth(updateRequest.getDateOfBirth());
        existingStudent.setAddress(updateRequest.getAddress());
        existingStudent.setDepartment(department);

        Student updatedStudent = studentRepository.save(existingStudent);
        return convertToDto(updatedStudent);
    }

    @Override
    public void deleteStudent(String prn) {
        if (!studentRepository.existsById(prn)) {
            throw new ResourceNotFoundException("Student not found with prn: " + prn);
        }
        studentRepository.deleteById(prn);
    }

    @Override
    public StudentResponse getStudentByPrn(String prn) {
        Student student = studentRepository.findById(prn)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with prn: " + prn));
        return convertToDto(student);
    }

    @Override
    public Page<StudentResponse> getAllStudents(Pageable pageable) {
        return studentRepository.findAll(pageable).map(this::convertToDto);
    }

    @Override
    public List<ScoreResponse> getMyMarks(String studentPrn) {
        List<Score> scores = scoreRepository.findByStudent_Prn(studentPrn);
        return scores.stream().map(this::convertScoreToDto).collect(Collectors.toList());
    }
    
    @Override
    public List<ActiveSessionResponse> getPendingFeedbackTasks(String studentPrn) {
        Student student = studentRepository.findById(studentPrn)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with prn: " + studentPrn));

        List<FeedbackSession> pendingSessions = feedbackSessionRepository
                .findPendingFeedbackSessionsForStudent(studentPrn, student.getDepartment().getDepartmentId());

        return pendingSessions.stream()
                .map(session -> new ActiveSessionResponse(
                        session.getSessionId(),
                        session.getModule().getModuleName(),
                        session.getInstructor().getFirstName() + " " + session.getInstructor().getLastName()
                ))
                .collect(Collectors.toList());
    }
    
    @Override
    public Page<StudentResponse> getStudentsByModule(String moduleId, Pageable pageable) {
    	
        CourseModule module = courseModuleRepository.findById(moduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + moduleId));
        
        Integer departmentId = module.getDepartment().getDepartmentId();
        
        Page<Student> studentPage = studentRepository.findByDepartment_DepartmentId(departmentId, pageable);
        return studentPage.map(this::convertToDto);
    }
    
//    @Override
//    public List<StudentAttendanceSummaryDto> getAttendanceSummary(String studentPrn) {
//        List<Attendance> allAttendance = attendanceRepository.findByStudent_Prn(studentPrn);
//
//        Map<String, List<Attendance>> groupedByModule = allAttendance.stream()
//            .filter(att -> att.getTimetableEntry() != null && att.getTimetableEntry().getModule() != null)
//            .collect(Collectors.groupingBy(att -> att.getTimetableEntry().getModule().getModuleName()));
//
//        return groupedByModule.entrySet().stream().map(entry -> {
//            String moduleName = entry.getKey();
//            List<Attendance> moduleAttendance = entry.getValue();
//            
//            long classesHeld = moduleAttendance.size();
//            long classesAttended = moduleAttendance.stream().filter(Attendance::getPresent).count();
//            
//            double percentage = 0;
//            if (classesHeld > 0) {
//                percentage = ((double) classesAttended / classesHeld) * 100;
//            }
//
//            return new StudentAttendanceSummaryDto(moduleName, classesHeld, classesAttended, percentage);
//        }).collect(Collectors.toList());
//    }

    private StudentResponse convertToDto(Student student) {
        StudentResponse dto = new StudentResponse();
        dto.setPrn(student.getPrn());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setPhoneNumber(student.getPhoneNumber());
        dto.setDateOfBirth(student.getDateOfBirth());
        dto.setAddress(student.getAddress());
        if (student.getDepartment() != null) {
            dto.setDepartmentId(student.getDepartment().getDepartmentId());
            dto.setDepartmentName(student.getDepartment().getDepartmentName());
        }
        return dto;
    }

    private ScoreResponse convertScoreToDto(Score score) {
        ScoreResponse dto = new ScoreResponse();
        dto.setScoreId(score.getScoreId());
        dto.setLabExamMarks(score.getLabExamMarks());
        dto.setInternalMarks(score.getInternalMarks());
        if (score.getStudent() != null) {
            dto.setStudentPrn(score.getStudent().getPrn());
            dto.setStudentName(score.getStudent().getFirstName() + " " + score.getStudent().getLastName());
        }
        if (score.getExam() != null) {
            dto.setExamId(score.getExam().getExamId());
            dto.setExamName(score.getExam().getExamName());
            dto.setExamDate(score.getExam().getExamDate());
            if (score.getExam().getModule() != null) {
                dto.setModuleName(score.getExam().getModule().getModuleName());
            }
        }
        return dto;
    }
}