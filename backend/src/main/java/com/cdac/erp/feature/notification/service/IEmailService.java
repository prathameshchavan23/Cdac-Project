package com.cdac.erp.feature.notification.service;

/**
 * Service interface for handling email notifications.
 */
public interface IEmailService {
    
    /**
     * Sends a simple plain text email.
     * @param to The recipient's email address.
     * @param subject The subject of the email.
     * @param text The plain text content of the email.
     */
    void sendSimpleMessage(String to, String subject, String text);
}