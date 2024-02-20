package com.launchcode.crescendo.backend.services;

import com.launchcode.crescendo.backend.models.Song;
import com.launchcode.crescendo.backend.repository.SongRepository;
import com.launchcode.crescendo.backend.repository.SongRepository;

import java.util.List;

public interface SongService {


    List<Song> searchSongs(String keyword);



    Song createSong(Song song);

    List<Song> getAllSongs();
}
