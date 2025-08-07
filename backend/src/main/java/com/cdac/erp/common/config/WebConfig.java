package com.cdac.erp.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
        		.addMapping("/**") // Apply CORS to all paths under /api/
                .allowedOrigins("http://localhost:3000", "http://localhost:5173") // Allow requests from your React app's development server
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true) // Allow sending cookies, authorization headers, etc.
                .maxAge(3600); // How long the pre-flight request can be cached (in seconds)
    }
}