package com.cdac.erp.feature.auth.dto;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminResponse {
    private Integer adminId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;
    private String role;
    private Integer departmentId;
    private String departmentName;
}