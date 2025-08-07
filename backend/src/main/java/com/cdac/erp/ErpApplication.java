package com.cdac.erp;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


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
