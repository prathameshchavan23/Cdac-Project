package com.cdac.erp.feature.auth.controller;

import com.cdac.erp.feature.auth.dto.AdminRegisterRequest;
import com.cdac.erp.feature.auth.dto.AdminResponse;
import com.cdac.erp.feature.auth.dto.AdminUpdateRequest;
import com.cdac.erp.feature.auth.service.IAuthService;

import jakarta.validation.Valid;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/admins")
public class AdminController {

    @Autowired
    private IAuthService authService;
    
    @PostMapping("/register/admin")
    public ResponseEntity<AdminResponse> registerAdmin(@Valid @RequestBody AdminRegisterRequest registerRequest) {
        AdminResponse createdAdmin = authService.registerAdmin(registerRequest);
        return new ResponseEntity<>(createdAdmin, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AdminResponse>> getAllAdmins() {
        return ResponseEntity.ok(authService.getAllAdmins());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminResponse> getAdminById(@PathVariable Integer id) {
        return ResponseEntity.ok(authService.getAdminById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminResponse> updateAdmin(@PathVariable Integer id,@Valid @RequestBody AdminUpdateRequest request) {
        return ResponseEntity.ok(authService.updateAdmin(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Integer id) {
        authService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }
}