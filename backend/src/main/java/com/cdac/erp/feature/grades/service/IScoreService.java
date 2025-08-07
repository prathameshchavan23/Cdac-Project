package com.cdac.erp.feature.grades.service;

import com.cdac.erp.feature.grades.dto.BulkScoreRequest;
import com.cdac.erp.feature.grades.dto.MarksEntryResponseDto;
import com.cdac.erp.feature.grades.dto.ScoreResponse;
import com.cdac.erp.feature.grades.dto.ScoreUpdateRequest;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service interface for managing student scores.
 */
public interface IScoreService {

    /**
     * Records or updates scores for multiple students in a single exam.
     * @param request The DTO containing the exam ID and a list of student scores.
     */
    void recordBulkScores(BulkScoreRequest request);

    /**
     * Retrieves all recorded scores for a specific exam.
     * @param examId The ID of the exam.
     * @return A list of DTOs representing the scores for that exam.
     */
    List<ScoreResponse> getScoresForExam(Integer examId);

    /**
     * Retrieves a paginated list of all students eligible for an exam,
     * along with their currently recorded marks.
     * @param examId The ID of the exam.
     * @param pageable The pagination information.
     * @return A paginated list of DTOs for the marks entry sheet.
     */
    Page<MarksEntryResponseDto> getMarksEntrySheetForExam(Integer examId, Pageable pageable);
    
    List<ScoreResponse> getAllScores();
    
    Page<ScoreResponse> getScoresForExam(Integer examId, Pageable pageable);
    
    ScoreResponse updateScore(Integer scoreId, ScoreUpdateRequest request);
    void deleteScore(Integer scoreId);
    
    ScoreResponse getScoreForStudent(Integer examId, String studentPrn);
}