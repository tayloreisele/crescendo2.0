package com.launchcode.crescendo.backend.controllers;

import com.launchcode.crescendo.backend.models.Song;
import com.launchcode.crescendo.backend.services.SongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/songs")
public class SearchController {

    private SongService songService;

    public SearchController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping("search")
    public ResponseEntity<List<Song>> searchSongs (@RequestParam("query") String query){
        return ResponseEntity.ok(songService.searchSongs(query));
    }
    @PostMapping
    public Song createSong (@RequestBody Song song){
        return songService.createSong(song);
    }
}


