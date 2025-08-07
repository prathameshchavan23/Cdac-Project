package com.cdac.erp.feature.studenttimetable.service;

import com.cdac.erp.feature.timetable.dto.TimetableEntryResponse;
import java.util.List;

public interface IStudentTimetableService {
    List<TimetableEntryResponse> getUpcomingTimetable(String studentPrn);
}