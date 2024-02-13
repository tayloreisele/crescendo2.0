package com.launchcode.crescendo.backend.controllers;

import com.launchcode.crescendo.backend.models.Song;
import com.launchcode.crescendo.backend.repository.SongRepository;
import com.launchcode.crescendo.backend.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/songs")
@CrossOrigin(origins = "http://localhost:3000") // Allows requests from localhost:3000 **don't know if I need this here
public class SearchController {

    private SongService songService;

    @Autowired //allows search feature to access database
    private SongRepository songRepository;

    public SearchController(SongService songService) {
        this.songService = songService;
    }
    @GetMapping("search")
    public List<Song> searchSongs(@RequestParam String keyword) {
        return songRepository.findByTitleContaining(keyword);
    }
//    @GetMapping("search")
//    public ResponseEntity<List<Song>> searchSongs (@RequestParam("query") String query){
//        return ResponseEntity.ok(songService.searchSongs(query));
//    }
    @PostMapping
    public Song createSong (@RequestBody Song song){
        return songService.createSong(song);
    }
}


