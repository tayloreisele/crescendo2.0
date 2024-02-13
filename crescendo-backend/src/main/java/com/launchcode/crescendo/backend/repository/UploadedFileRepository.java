package com.launchcode.crescendo.backend.repository;

import com.launchcode.crescendo.backend.UploadedFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadedFileRepository extends JpaRepository<UploadedFile, Long> {

}