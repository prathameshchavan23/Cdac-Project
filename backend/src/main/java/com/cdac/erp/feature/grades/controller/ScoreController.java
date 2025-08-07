package com.cdac.erp.feature.grades.controller;

import com.cdac.erp.feature.grades.dto.*;
import com.cdac.erp.feature.grades.service.IScoreService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/scores")
public class ScoreController {

	@Autowired
	private IScoreService scoreService;

	@GetMapping("/exam/{examId}/student/{studentPrn}")
	public ResponseEntity<ScoreResponse> getScoreForStudent(@PathVariable Integer examId,
			@PathVariable String studentPrn) {
		ScoreResponse score = scoreService.getScoreForStudent(examId, studentPrn);
		return ResponseEntity.ok(score);
	}

	// --- ADD THESE MISSING METHODS ---
	@PutMapping("/{scoreId}")
	public ResponseEntity<ScoreResponse> updateScore(@PathVariable Integer scoreId,
			@Valid @RequestBody ScoreUpdateRequest request) {
		ScoreResponse updatedScore = scoreService.updateScore(scoreId, request);
		return ResponseEntity.ok(updatedScore);
	}

	@DeleteMapping("/{scoreId}")
	public ResponseEntity<Void> deleteScore(@PathVariable Integer scoreId) {
		scoreService.deleteScore(scoreId);
		return ResponseEntity.noContent().build();
	}
	// --------------------------------

	@PostMapping("/bulk")
	public ResponseEntity<Void> recordBulkScores(@Valid @RequestBody BulkScoreRequest request) {
		scoreService.recordBulkScores(request);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/exam/{examId}")
	public ResponseEntity<Page<ScoreResponse>> getScoresForExam(@PathVariable Integer examId, Pageable pageable) {
	    Page<ScoreResponse> scores = scoreService.getScoresForExam(examId, pageable);
	    return ResponseEntity.ok(scores);
	}

	@GetMapping("/exam/{examId}/marks-sheet")
	public ResponseEntity<Page<MarksEntryResponseDto>> getMarksEntrySheet(@PathVariable Integer examId,
			Pageable pageable) {
		Page<MarksEntryResponseDto> marksSheet = scoreService.getMarksEntrySheetForExam(examId, pageable);
		return ResponseEntity.ok(marksSheet);
	}

	@GetMapping
	public ResponseEntity<List<ScoreResponse>> getAllScores() {
		List<ScoreResponse> scores = scoreService.getAllScores();
		return ResponseEntity.ok(scores);
	}
}