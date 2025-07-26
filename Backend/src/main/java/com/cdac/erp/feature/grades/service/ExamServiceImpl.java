package com.cdac.erp.feature.grades.service;

import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Exam;
import com.cdac.erp.core.model.Module;
import com.cdac.erp.core.repository.ExamRepository;
import com.cdac.erp.core.repository.ModuleRepository;
import com.cdac.erp.feature.grades.dto.ExamRequest;
import com.cdac.erp.feature.grades.dto.ExamResponse;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamServiceImpl implements IExamService {

    @Autowired private ExamRepository examRepository;
    @Autowired private ModuleRepository moduleRepository;

    @Override
    public ExamResponse createExam(ExamRequest request) {
        Module module = moduleRepository.findById(request.getModuleId())
                .orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + request.getModuleId()));

        Exam exam = new Exam();
        exam.setModule(module);
        exam.setExamName(request.getExamName());
        exam.setExamDate(request.getExamDate());

        Exam savedExam = examRepository.save(exam);
        return convertToDto(savedExam);
    }

    @Override
    public List<ExamResponse> getAllExams() {
        return examRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private ExamResponse convertToDto(Exam exam) {
        ExamResponse dto = new ExamResponse();
        dto.setExamId(exam.getExamId());
        dto.setExamName(exam.getExamName());
        dto.setExamDate(exam.getExamDate());
        if (exam.getModule() != null) {
            dto.setModuleId(exam.getModule().getModuleId());
            dto.setModuleName(exam.getModule().getModuleName());
        }
        return dto;
    }
}