package com.cdac.erp.feature.attendance.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceUpdateRequest {

	@NotNull(message = "Presence status is required")
	private Boolean present; // Changed from boolean to Boolean

    private BigDecimal attendedHours;
}