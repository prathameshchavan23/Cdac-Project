package com.cdac.erp.feature.auth.controller;

import com.cdac.erp.feature.auth.dto.AdminRegisterRequest;
import com.cdac.erp.feature.auth.dto.AdminResponse;
import com.cdac.erp.feature.auth.dto.AuthResponse;
import com.cdac.erp.feature.auth.dto.LoginRequest;
import com.cdac.erp.feature.auth.service.IAuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private IAuthService authService;
    //this is public endpoint in case we want to register the admin first time 
    
//    @PostMapping("/register/admin")
//    public ResponseEntity<AdminResponse> registerAdmin(@Valid @RequestBody AdminRegisterRequest registerRequest) {
//        AdminResponse createdAdmin = authService.registerAdmin(registerRequest);
//        return new ResponseEntity<>(createdAdmin, HttpStatus.CREATED);
//    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.login(loginRequest);
        return ResponseEntity.ok(authResponse);
    }
}