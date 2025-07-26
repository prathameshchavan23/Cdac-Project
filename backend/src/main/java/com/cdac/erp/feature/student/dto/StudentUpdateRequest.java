package com.cdac.erp.feature.student.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentUpdateRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    private String lastName;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    private String email;

    @NotNull(message = "Department ID is required")
    private Integer departmentId;
}