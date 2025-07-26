package com.cdac.erp.feature.admindashboard.service;

import com.cdac.erp.core.repository.InstructorRepository;
import com.cdac.erp.core.repository.ModuleRepository;
import com.cdac.erp.core.repository.StudentRepository;
import com.cdac.erp.feature.admindashboard.dto.AdminDashboardStatsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminDashboardServiceImpl implements IAdminDashboardService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private InstructorRepository instructorRepository;
    @Autowired private ModuleRepository moduleRepository;

    @Override
    public AdminDashboardStatsDto getDashboardStats() {
        long studentCount = studentRepository.count();
        long instructorCount = instructorRepository.count();
        long moduleCount = moduleRepository.count();

        return new AdminDashboardStatsDto(studentCount, instructorCount, moduleCount);
    }
}