package com.cdac.erp.feature.grades.controller;

import com.cdac.erp.feature.grades.dto.BulkScoreRequest;
import com.cdac.erp.feature.grades.dto.ScoreResponse;
import com.cdac.erp.feature.grades.service.IScoreService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cdac.erp.feature.grades.dto.MarksEntryResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/admin/scores")
public class ScoreController {

	@Autowired
	private IScoreService scoreService;

	@PostMapping("/bulk")
	public ResponseEntity<Void> recordBulkScores(@Valid @RequestBody BulkScoreRequest request) {
		scoreService.recordBulkScores(request);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/exam/{examId}")
	public ResponseEntity<List<ScoreResponse>> getScoresForExam(@PathVariable Integer examId) {
		List<ScoreResponse> scores = scoreService.getScoresForExam(examId);
		return ResponseEntity.ok(scores);
	}

	@GetMapping("/exam/{examId}/marks-sheet")
	public ResponseEntity<Page<MarksEntryResponseDto>> getMarksEntrySheet(@PathVariable Integer examId,
			Pageable pageable) {
		Page<MarksEntryResponseDto> marksSheet = scoreService.getMarksEntrySheetForExam(examId, pageable);
		return ResponseEntity.ok(marksSheet);
	}
}