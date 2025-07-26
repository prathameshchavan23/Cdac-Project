package com.cdac.erp.core.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Departments") // Matches your table name
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id") // Matches your primary key column
    private Integer departmentId;

    @Column(name = "department_name", length = 100, unique = true, nullable = false) // Matches your column
    private String departmentName;
    
    public Department(String departmentName) {
        this.departmentName = departmentName;
    }

}