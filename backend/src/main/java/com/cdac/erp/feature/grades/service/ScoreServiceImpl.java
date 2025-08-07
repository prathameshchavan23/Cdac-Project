package com.cdac.erp.feature.grades.service;

import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Exam;
import com.cdac.erp.core.model.Score;
import com.cdac.erp.core.model.Student;
import com.cdac.erp.core.repository.ExamRepository;
import com.cdac.erp.core.repository.ScoreRepository;
import com.cdac.erp.core.repository.StudentRepository;
import com.cdac.erp.feature.grades.dto.BulkScoreRequest;
import com.cdac.erp.feature.grades.dto.ScoreResponse;
import com.cdac.erp.feature.grades.dto.ScoreUpdateRequest;
import com.cdac.erp.feature.grades.dto.StudentScoreDto;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cdac.erp.feature.grades.dto.MarksEntryResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ScoreServiceImpl implements IScoreService {

    @Autowired private ScoreRepository scoreRepository;
    @Autowired private StudentRepository studentRepository;
    @Autowired private ExamRepository examRepository;

    @Override
    @Transactional
    public void recordBulkScores(BulkScoreRequest request) {
        Exam exam = examRepository.findById(request.getExamId())
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + request.getExamId()));

        for (StudentScoreDto scoreDto : request.getScores()) {
            Student student = studentRepository.findById(scoreDto.getStudentPrn())
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found with prn: " + scoreDto.getStudentPrn()));
            
            Score score = scoreRepository.findByStudent_PrnAndExam_ExamId(student.getPrn(), exam.getExamId())
                    .orElse(new Score());

            score.setStudent(student);
            score.setExam(exam);
            score.setLabExamMarks(scoreDto.getLabExamMarks());
            score.setInternalMarks(scoreDto.getInternalMarks());
            
            scoreRepository.save(score);
        }
    }
    
    @Override
    @Transactional
    public ScoreResponse updateScore(Integer scoreId, ScoreUpdateRequest request) {
        Score existingScore = scoreRepository.findById(scoreId)
                .orElseThrow(() -> new ResourceNotFoundException("Score not found with id: " + scoreId));

        existingScore.setLabExamMarks(request.getLabExamMarks());
        existingScore.setInternalMarks(request.getInternalMarks());

        Score updatedScore = scoreRepository.save(existingScore);
        return convertToDto(updatedScore);
    }

    @Override
    public void deleteScore(Integer scoreId) {
        if (!scoreRepository.existsById(scoreId)) {
            throw new ResourceNotFoundException("Score not found with id: " + scoreId);
        }
        scoreRepository.deleteById(scoreId);
    }

    @Override
    public List<ScoreResponse> getScoresForExam(Integer examId) {
        if (!examRepository.existsById(examId)) {
            throw new ResourceNotFoundException("Exam not found with id: " + examId);
        }
        return scoreRepository.findByExam_ExamId(examId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ScoreResponse convertToDto(Score score) {
        ScoreResponse dto = new ScoreResponse();
        dto.setScoreId(score.getScoreId());
        dto.setLabExamMarks(score.getLabExamMarks());
        dto.setInternalMarks(score.getInternalMarks());
        
        if (score.getStudent() != null) {
            dto.setStudentPrn(score.getStudent().getPrn());
            dto.setStudentName(score.getStudent().getFirstName() + " " + score.getStudent().getLastName());
        }
        
        if (score.getExam() != null) {
            dto.setExamId(score.getExam().getExamId());
            dto.setExamName(score.getExam().getExamName());
            // REMOVED: dto.setMaxMarks(score.getExam().getMaxMarks());
            if (score.getExam().getModule() != null) {
                dto.setModuleName(score.getExam().getModule().getModuleName());
            }
        }
        
        return dto;
    }
    
    @Override
    public Page<MarksEntryResponseDto> getMarksEntrySheetForExam(Integer examId, Pageable pageable) {
        // 1. Find the exam to get the department
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + examId));
        Integer departmentId = exam.getModule().getDepartment().getDepartmentId();

        // 2. Get a paginated list of students in that department
        Page<Student> studentsPage = studentRepository.findByDepartment_DepartmentId(departmentId, pageable);

        // 3. Get all existing scores for this exam to perform a quick lookup
        Map<String, Score> scoresMap = scoreRepository.findByExam_ExamId(examId).stream()
                .collect(Collectors.toMap(score -> score.getStudent().getPrn(), score -> score));

        // 4. Map the student page to our new DTO
        return studentsPage.map(student -> {
            Score existingScore = scoresMap.get(student.getPrn());
            if (existingScore != null) {
                // If score exists, return student details with their marks
                return new MarksEntryResponseDto(student.getPrn(), student.getFirstName() + " " + student.getLastName(),
                        existingScore.getLabExamMarks(), existingScore.getInternalMarks());
            } else {
                // If score doesn't exist, return student details with null/0 marks
                return new MarksEntryResponseDto(student.getPrn(), student.getFirstName() + " " + student.getLastName(),
                        null, null);
            }
        });
    }
    
    @Override
    public ScoreResponse getScoreForStudent(Integer examId, String studentPrn) {
        Score score = scoreRepository.findByStudent_PrnAndExam_ExamId(studentPrn, examId)
                .orElseThrow(() -> new ResourceNotFoundException("Score not found for student " + studentPrn + " in exam " + examId));
        return convertToDto(score);
    }
    
    @Override
    public List<ScoreResponse> getAllScores() {
        return scoreRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public Page<ScoreResponse> getScoresForExam(Integer examId, Pageable pageable) {
        // --- START OF DEBUGGING ---
        System.out.println("--- Searching for scores for examId: " + examId + " ---");
        // --------------------------

        if (!examRepository.existsById(examId)) {
            throw new ResourceNotFoundException("Exam not found with id: " + examId);
        }
        
        Page<Score> scorePage = scoreRepository.findByExam_ExamId(examId, pageable);
        
        // --- START OF DEBUGGING ---
        System.out.println("--- Found " + scorePage.getTotalElements() + " score(s) for this exam. ---");
        // --------------------------

        return scorePage.map(this::convertToDto);
    }
}