package com.cdac.erp.core.repository;

import com.cdac.erp.core.model.FeedbackSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeedbackSessionRepository extends JpaRepository<FeedbackSession, Integer> {
    List<FeedbackSession> findByIsActive(boolean isActive);
    
    //for widget
    @Query("SELECT fs FROM FeedbackSession fs WHERE fs.isActive = true " +
            "AND fs.module.department.departmentId = :departmentId " +
            "AND fs.sessionId NOT IN " +
            "(SELECT f.feedbackSession.sessionId FROM Feedback f WHERE f.student.prn = :prn)")
     List<FeedbackSession> findPendingFeedbackSessionsForStudent(@Param("prn") String prn, @Param("departmentId") Integer departmentId);
}