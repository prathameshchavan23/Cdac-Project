package com.cdac.erp.security.service;

import com.cdac.erp.core.model.Admin;
import com.cdac.erp.core.model.Student;
import com.cdac.erp.core.repository.AdminRepository;
import com.cdac.erp.core.repository.StudentRepository;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Custom implementation of Spring Security's UserDetailsService.
 * It loads user-specific data from the Admin and Student tables.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StudentRepository studentRepository;

    /**
     * Locates the user based on the username. In the actual implementation, the search
     * may possibly be case sensitive, depending on how the implementaion is configured.
     * The logic first checks for an Admin by email, and if not found, checks for a Student by PRN.
     *
     * @param username the username identifying the user whose data is required.
     * @return a fully populated user record (never {@code null})
     * @throws UsernameNotFoundException if the user could not be found or the user has no
     * GrantedAuthority
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // First, check if the user is an Admin by email
        Optional<Admin> adminOptional = adminRepository.findByEmail(username);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
//            List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("Admin"));
            List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(admin.getRole()));
//            return new User(admin.getEmail(), admin.getPasswordHash(), authorities);
            return new User(admin.getEmail(), admin.getPasswordHash(), authorities);
        }

        // If not an Admin, check if the user is a Student by PRN
        Optional<Student> studentOptional = studentRepository.findById(username);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("Student"));
            return new User(student.getPrn(), student.getPasswordHash(), authorities);
        }

        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}