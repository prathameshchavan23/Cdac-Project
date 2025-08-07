package com.cdac.erp.feature.student.dto;

import jakarta.validation.constraints.Email;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentCreateRequest {

    @NotBlank(message = "PRN is required")
    private String prn;

    @NotBlank(message = "First name is required")
    private String firstName;
    
    private String lastName;
    private String phoneNumber;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    private String address;

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @NotNull(message = "Department ID is required")
    private Integer departmentId;
}