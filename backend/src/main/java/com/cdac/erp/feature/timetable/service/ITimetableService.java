package com.cdac.erp.feature.timetable.service;

import com.cdac.erp.feature.timetable.dto.TimetableEntryRequest;
import com.cdac.erp.feature.timetable.dto.TimetableEntryResponse;
import com.cdac.erp.feature.timetable.dto.TimetableEntryUpdateRequest;

import java.time.LocalDate;
import java.util.List;

/**
 * Service interface for managing Timetable entries.
 */
public interface ITimetableService {

    /**
     * Creates a new timetable entry.
     * @param request The DTO containing the details for the new entry.
     * @return A DTO representing the newly created timetable entry.
     */
    TimetableEntryResponse createTimetableEntry(TimetableEntryRequest request);

    /**
     * Retrieves a list of all timetable entries.
     * @return A list of DTOs representing all timetable entries.
     */
    List<TimetableEntryResponse> getAllTimetableEntries();

    /**
     * Deletes a timetable entry by its unique ID.
     * @param id The ID of the timetable entry to delete.
     */
    void deleteTimetableEntry(Integer id);

    /**
     * Updates an existing timetable entry.
     * @param id The ID of the timetable entry to update.
     * @param request The DTO containing the updated details.
     * @return A DTO representing the updated timetable entry.
     */
//    TimetableEntryResponse updateTimetableEntry(Integer id, TimetableEntryUpdateRequest request);

    /**
     * Sends a custom email notification to all students regarding the timetable.
     * @param subject The subject of the notification email.
     * @param message The body content of the notification email.
     */
    void sendTimetableNotification(String subject, String message);
    
    /**
     * Retrieves all timetable entries scheduled for the specific day.
     * @return A list of DTOs representing today's timetable entries.
     */
    List<TimetableEntryResponse> getEntriesByDate(LocalDate date);
}