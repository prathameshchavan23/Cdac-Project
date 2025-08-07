package com.cdac.erp.feature.attendance.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentAttendanceDto {

    @NotBlank(message = "Student PRN is required")
    private String studentPrn;

    @NotNull(message = "Presence status is required")
    private Boolean isPresent; // Use Boolean object type for @NotNull
    
    public Boolean getIsPresent() {
        return this.isPresent;
    }
}