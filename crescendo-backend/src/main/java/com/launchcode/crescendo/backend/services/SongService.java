package com.launchcode.crescendo.backend.services;

import com.launchcode.crescendo.backend.models.Song;

import java.util.List;

public interface SongService {
    List<Song> searchSongs(String query);

    Song createSong(Song song);

    List<Song> getAllSongs();
}
