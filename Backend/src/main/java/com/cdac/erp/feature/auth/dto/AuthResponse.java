package com.cdac.erp.feature.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
//@AllArgsConstructor
public class AuthResponse {
    private String email;
    private String role;
    private String message;
    private String accessToken; // Added during security implementation 
    
    //added during security
    public AuthResponse(String email, String role, String message, String accessToken) {
        this.email = email;
        this.role = role;
        this.message = message;
        this.accessToken = accessToken;
    }
}