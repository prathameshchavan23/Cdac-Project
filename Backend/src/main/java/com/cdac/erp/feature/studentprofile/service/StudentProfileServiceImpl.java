package com.cdac.erp.feature.studentprofile.service;

import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Student;
import com.cdac.erp.core.repository.StudentRepository;
import com.cdac.erp.feature.student.dto.StudentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentProfileServiceImpl implements IStudentProfileService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public StudentResponse getStudentProfile(String studentPrn) {
        Student student = studentRepository.findById(studentPrn)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with prn: " + studentPrn));
        return convertToDto(student);
    }

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
}