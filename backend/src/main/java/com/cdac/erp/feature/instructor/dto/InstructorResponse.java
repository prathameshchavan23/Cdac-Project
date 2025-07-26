package com.cdac.erp.feature.instructor.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InstructorResponse {
    private Integer instructorId;
    private String firstName;
    private String lastName;
    private String email;
    private String contactNo;
}