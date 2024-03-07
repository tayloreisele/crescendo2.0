package com.launchcode.crescendo.backend.controllers;

import com.launchcode.crescendo.backend.repository.UserRepository;
import com.launchcode.crescendo.backend.VerificationToken;
import com.launchcode.crescendo.backend.repository.VerificationTokenRepository;

import jakarta.servlet.http.HttpSession;

import com.launchcode.crescendo.backend.models.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.javamail.JavaMailSender;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import java.math.BigInteger;
import java.util.Calendar;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
public class UserController {
    private final UserRepository userRepository;
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        log.info("Received signup request for user {}", user);
        // Check if the username is already taken
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("{\"message\":\"Username already taken\"}");
        }

        // Save the user
        user.setEnabled(false);
        userRepository.save(user);

        // Generate a verification token
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(token, user);
        verificationTokenRepository.save(verificationToken);

        // Send a verification email
        String recipientAddress = user.getEmail();
        String subject = "Crescendo account registration confirmation";

        // UPDATE BELOW WITH URL TO VERIFICATION PAGE
        String confirmationUrl = "http://localhost:3000/verify?token=" + token;
        String message = "Please confirm your Crescendo registration by clicking the following link: " + confirmationUrl;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message);
        mailSender.send(email);

        // Hashes the password and sets it
        user.setPassword(hashPassword(user.getPassword()));

        // Save the user to the database
        userRepository.save(user);

        return ResponseEntity.ok().body("{\"message\":\"Signup successful! Please check your email for verification.\"}");
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(password.getBytes(StandardCharsets.UTF_8));
            return String.format("%064x", new BigInteger(1, hash));
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }


    // Using for debugging database connection
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        Iterable<User> users = userRepository.findAll();
        log.info("Fetched all users: {}", users);
        return ResponseEntity.ok(users);
    }

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam("token") String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
        if (verificationToken == null) {
            return ResponseEntity.badRequest().body("{\"message\":\"Invalid or expired token.\"}");
        }

        User user = verificationToken.getUser();
        Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            return ResponseEntity.badRequest().body("{\"message\":\"Token has expired.\"}");
        }

        user.setEnabled(true);
        userRepository.save(user);
        return ResponseEntity.ok().body("{\"message\":\"Account verified successfully. You may now login at the link below.\"}");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpSession session) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null && existingUser.getPassword().equals(hashPassword(user.getPassword()))) {
            // User exists and password is correct
            session.setAttribute("user", existingUser);
            System.out.println("User added to session: " + session.getId()); // Debugging
            return ResponseEntity.ok().body("{\"message\":\"Login successful!\"}");
        } else {
            // User does not exist or password is incorrect
            return ResponseEntity.badRequest().body("{\"message\":\"Invalid username or password.\"}");
        }
    }

    @GetMapping("/auth/check")
    public ResponseEntity<?> checkAuth(HttpSession session) {
        if (session.getAttribute("user") != null) {
            // User is logged in
            return ResponseEntity.ok().body("{\"status\":\"authenticated\"}");
        } else {
            // User is not logged in
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"status\":\"unauthenticated\"}");
        }
    }

}