package com.cdac.erp.common.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

	
	// This handler is for when a resource like a Department or Student isn't found
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("message", ex.getMessage());
		return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
	}

	// Add this new handler for bad login credentials
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<Object> handleBadCredentialsException(BadCredentialsException ex, WebRequest request) {
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("message", "Invalid username or password");
		return new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED); // Returns 401
	}

	// 400 Bad Request
	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<Object> handleBadRequestException(BadRequestException ex, WebRequest request) {
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("message", ex.getMessage());
		return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
	}

	// 409 Conflict Exception
	@ExceptionHandler(ConflictException.class)
	public ResponseEntity<Object> handleConflictException(ConflictException ex, WebRequest request) {
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("message", ex.getMessage()); // Gets the message from our service
		return new ResponseEntity<>(body, HttpStatus.CONFLICT); // Returns 409
	}

	// 400 Bad Request - For @Valid validation errors
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, WebRequest request) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});

		Map<String, Object> body = new LinkedHashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("message", "Validation failed");
		body.put("errors", errors);
		return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
	}

	// 500 Internal Server Error - Generic fallback
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleGlobalException(Exception ex, WebRequest request) {
		ex.printStackTrace();
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("message", "An unexpected error occurred");
		// For debugging, you might log ex.getMessage() to your server logs
		return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}