package com.cdac.erp.feature.studentmarks.service;

import com.cdac.erp.core.model.Score;
import com.cdac.erp.core.repository.ScoreRepository;
import com.cdac.erp.feature.grades.dto.ScoreResponse;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentMarksServiceImpl implements IStudentMarksService {

	@Autowired
	private ScoreRepository scoreRepository;

	@Override
	public List<ScoreResponse> getMyMarks(String studentPrn) {
		List<Score> scores = scoreRepository.findByStudent_Prn(studentPrn);
		return scores.stream().map(this::convertScoreToDto).collect(Collectors.toList());
	}

	private ScoreResponse convertScoreToDto(Score score) {
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
			dto.setExamDate(score.getExam().getExamDate()); // Add this line
			if (score.getExam().getModule() != null) {
				dto.setModuleName(score.getExam().getModule().getModuleName());
			}
		}
		return dto;
	}
}