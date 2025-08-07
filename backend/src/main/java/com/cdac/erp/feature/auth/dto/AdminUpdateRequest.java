package com.cdac.erp.feature.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUpdateRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "First name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    private String email;

    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;

    @NotBlank(message = "Role is required")
    private String role;

    @NotNull(message = "Department ID is required")
    private Integer departmentId;
}