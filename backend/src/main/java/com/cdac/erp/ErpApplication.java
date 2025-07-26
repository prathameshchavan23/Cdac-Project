package com.cdac.erp;

import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cdac.erp.core.model.Admin;
import com.cdac.erp.core.repository.AdminRepository;

@SpringBootApplication
public class ErpApplication {

	public static void main(String[] args) {
		SpringApplication.run(ErpApplication.class, args);
	}
	
//	@Bean
//	public CommandLineRunner passwordGenerator(PasswordEncoder passwordEncoder) {
//	    return args -> {
//	        String password = "pass123";
//	        String hashedPassword = passwordEncoder.encode(password);
//	        System.out.println("--- HASH FOR 'pass123' ---");
//	        System.out.println(hashedPassword);
//	        System.out.println("--- COPY THIS HASH ---");
//	    };
//	}
}
