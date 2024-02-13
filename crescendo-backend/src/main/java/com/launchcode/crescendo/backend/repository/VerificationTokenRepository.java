package com.launchcode.crescendo.backend.repository;

import com.launchcode.crescendo.backend.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByToken(String token);
}