package com.cdac.erp.feature.auth.service;

import com.cdac.erp.common.exception.ConflictException;
import com.cdac.erp.common.exception.ResourceNotFoundException;
import com.cdac.erp.core.model.Admin;
import com.cdac.erp.core.model.Department;
import com.cdac.erp.core.model.Student;
import com.cdac.erp.core.repository.AdminRepository;
import com.cdac.erp.core.repository.DepartmentRepository;
import com.cdac.erp.core.repository.FeedbackRepository;
import com.cdac.erp.core.repository.StudentRepository;
import com.cdac.erp.feature.auth.dto.AdminRegisterRequest;
import com.cdac.erp.feature.auth.dto.AdminResponse;
import com.cdac.erp.feature.auth.dto.AdminUpdateRequest;
import com.cdac.erp.feature.auth.dto.AuthResponse;
import com.cdac.erp.feature.auth.dto.LoginRequest;
import com.cdac.erp.security.util.JwtTokenProvider;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements IAuthService {

	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private DepartmentRepository departmentRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private FeedbackRepository feedbackRepository;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtTokenProvider tokenProvider;

	@Override
	public AdminResponse registerAdmin(AdminRegisterRequest registerRequest) {
		Department department = departmentRepository.findById(registerRequest.getDepartmentId())
				.orElseThrow(() -> new ResourceNotFoundException(
						"Department not found with id: " + registerRequest.getDepartmentId()));

		Admin admin = new Admin();
		
		// set all fields from the request
		admin.setFirstName(registerRequest.getFirstName());
		admin.setLastName(registerRequest.getLastName());
		admin.setEmail(registerRequest.getEmail());
		admin.setPhoneNumber(registerRequest.getPhoneNumber());
		admin.setDateOfBirth(registerRequest.getDateOfBirth());
		admin.setAddress(registerRequest.getAddress());
		admin.setRole(registerRequest.getRole());
		admin.setDepartment(department);

		String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
		admin.setPasswordHash(hashedPassword);

		Admin savedAdmin = adminRepository.save(admin);

		// Convert the saved entity to a DTO before returning
		return convertToDto(savedAdmin);
	}

	@Override
	public AuthResponse login(LoginRequest loginRequest) {
		
		//will call CustomUserDetailsService here
	    Authentication authentication = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(
	                    loginRequest.getUsername(),
	                    loginRequest.getPassword()
	            )
	    );

	    SecurityContextHolder.getContext().setAuthentication(authentication);
	    
	    String jwt = tokenProvider.generateToken(authentication);

	    String username = authentication.getName();
	    
	    //ROLE_admin
	    String roleWithPrefix = authentication.getAuthorities().stream()
	            .findFirst()//get first authority
	            .map(GrantedAuthority::getAuthority)// will return string
	            .orElse("");

	    String email = username;
	    // Check for "ROLE_Student"
	    if (roleWithPrefix.equals("ROLE_Student")) {
	        Student student = studentRepository.findById(username)
	                .orElseThrow(() -> new ResourceNotFoundException("Student not found with prn: " + username));
	        
	        email = student.getEmail();
	    }
	    
	    // Remove/Replace the "ROLE_" prefix for the response
	    String finalRole = roleWithPrefix.replace("ROLE_", "");

	    return new AuthResponse(email, finalRole, "Login successful", jwt);
	}

	@Override
	public List<AdminResponse> getAllAdmins() {
		return adminRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
	}

	@Override
	public AdminResponse getAdminById(Integer adminId) {
		Admin admin = adminRepository.findById(adminId)
				.orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + adminId));
		return convertToDto(admin);
	}

	@Override
	@Transactional
	public AdminResponse updateAdmin(Integer adminId, AdminUpdateRequest request) {
		Admin existingAdmin = adminRepository.findById(adminId)
				.orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + adminId));
		Department department = departmentRepository.findById(request.getDepartmentId()).orElseThrow(
				() -> new ResourceNotFoundException("Department not found with id: " + request.getDepartmentId()));

		existingAdmin.setFirstName(request.getFirstName());
		existingAdmin.setLastName(request.getLastName());
		existingAdmin.setEmail(request.getEmail());
		existingAdmin.setPhoneNumber(request.getPhoneNumber());
		existingAdmin.setDateOfBirth(request.getDateOfBirth());
		existingAdmin.setAddress(request.getAddress());
		existingAdmin.setRole(request.getRole());
		existingAdmin.setDepartment(department);

		Admin updatedAdmin = adminRepository.save(existingAdmin);
		return convertToDto(updatedAdmin);
	}

	@Override
	public void deleteAdmin(Integer adminId) {
		
		//check if admin exists or not
		if (!adminRepository.existsById(adminId)) {
			throw new ResourceNotFoundException("Admin not found with id: " + adminId);
		}
		
		//check if it is associated with some feedback in table.
		if (feedbackRepository.existsByResolvedByAdmin_AdminId(adminId)) {
			throw new ConflictException("Cannot delete admin. They are linked to one or more feedback records.");
		}

		adminRepository.deleteById(adminId);
	}

	private AdminResponse convertToDto(Admin admin) {
		AdminResponse dto = new AdminResponse();
		
		dto.setAdminId(admin.getAdminId());
		dto.setFirstName(admin.getFirstName());
		dto.setLastName(admin.getLastName());
		dto.setEmail(admin.getEmail());
		dto.setPhoneNumber(admin.getPhoneNumber());
		dto.setDateOfBirth(admin.getDateOfBirth());
		dto.setAddress(admin.getAddress());
		dto.setRole(admin.getRole());
		
		if (admin.getDepartment() != null) {
			dto.setDepartmentId(admin.getDepartment().getDepartmentId());
			dto.setDepartmentName(admin.getDepartment().getDepartmentName());
		}
		
		return dto;
	}
}