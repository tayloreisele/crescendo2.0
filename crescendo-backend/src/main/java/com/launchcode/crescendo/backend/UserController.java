package com.launchcode.crescendo.backend;

import com.launchcode.crescendo.backend.User;
import com.launchcode.crescendo.backend.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import java.math.BigInteger;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    private final UserRepository userRepository;
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        log.info("Received signup request for user {}", user);
        // Check if the username is already taken
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("{\"message\":\"Username already taken\"}");
        }

        // Hashes the password and sets it
        user.setPassword(hashPassword(user.getPassword()));

        //Save the user to the database
        userRepository.save(user);

        return ResponseEntity.ok().body("{\"message\":\"Signup successful!\"}");
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

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        Iterable<User> users = userRepository.findAll();
        log.info("Fetched all users: {}", users);
        return ResponseEntity.ok(users);
    }
}