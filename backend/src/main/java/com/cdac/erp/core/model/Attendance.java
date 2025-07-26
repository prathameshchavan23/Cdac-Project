package com.cdac.erp.core.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Attendance",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"prn", "timetable_entry_id", "attendance_date"})
       }
)
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendance_id")
    private Integer attendanceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prn", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "timetable_entry_id", nullable = false)
    private TimetableEntry timetableEntry;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Column(name = "is_present", nullable = false)
    private Boolean present; // Changed from boolean to Boolean

    @Column(name = "attended_hours", precision = 4, scale = 2)
    private BigDecimal attendedHours;
}