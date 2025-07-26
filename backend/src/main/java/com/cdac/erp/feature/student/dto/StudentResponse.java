package com.cdac.erp.feature.student.dto;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentResponse {
    private String prn;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;
    private String email;
    private Integer departmentId;
    private String departmentName;
}