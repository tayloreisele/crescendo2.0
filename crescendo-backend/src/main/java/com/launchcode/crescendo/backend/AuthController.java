package com.launchcode.crescendo.backend;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @PostMapping("/logout")
    public String logout() {
        return "Logout endpoint hit";
    }
}