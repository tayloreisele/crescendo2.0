package com.launchcode.crescendo.backend.repository;

import com.launchcode.crescendo.backend.models.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    List<Song> findByTitleContaining(String keyword);
    Optional<Song> findById(long id);

    List<Song> findByFavoriteTrue();

    List<Song> findByUserId(Long userId);
}

