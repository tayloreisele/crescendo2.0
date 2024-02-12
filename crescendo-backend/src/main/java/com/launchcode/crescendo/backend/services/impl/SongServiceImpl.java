package com.launchcode.crescendo.backend.services.impl;

import com.launchcode.crescendo.backend.models.Song;
import com.launchcode.crescendo.backend.repository.SongRepository;
import com.launchcode.crescendo.backend.services.SongService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongServiceImpl implements SongService {

    private SongRepository songRepository;

    public SongServiceImpl(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    @Override
    public List<Song> searchSongs(String query){
        List<Song> songs = songRepository.searchSongsSQL(query);
        return songs;
    }

    @Override
    public Song createSong(Song song) {
        return songRepository.save(song);
    }

}
