package com.launchcode.crescendo.backend.controllers;

import com.launchcode.crescendo.backend.repository.SongRepository;
import com.launchcode.crescendo.backend.models.Song;
import com.launchcode.crescendo.backend.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/songs")
@CrossOrigin(origins = "http://localhost:3000") // Allows requests from localhost:3000

public class SongController {
    @Autowired
    private SongRepository songRepository;

    @Autowired
    private SongService songService;


    //Create a new song
    @PostMapping("/add")
    public Song createSong(@RequestBody Song song) {
       return songService.createSong(song);//used when search feature is added
    }

    //Get a list of all the songs
    @GetMapping("/list")
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    //Search the list of songs by title
    @GetMapping("search")
    public List<Song> searchSongs(@RequestParam String keyword) {
        return songRepository.findByTitleContaining(keyword);
    }
}

//    // next 9 lines used for search feature
//    private SongService songService;
//
//    public SongController(SongService songService) {
//        this.songService = songService;
//    }
//
//    @GetMapping("search")
//    public ResponseEntity<List<Song>> searchSongs (@RequestParam("query") String query){
//        return ResponseEntity.ok(songService.searchSongs(query));
//    }

//}


//    @GetMapping("update/{id}")
//    public String displayUpdateSongForm(@PathVariable int id, Model model){
//        Song songToUpdate = MusicData.getById(id);
//        if (songToUpdate == null){
//            return "redirect:/songs";
//        }
//        model.addAttribute("title", "Update Song");
//        model.addAttribute("song", songToUpdate);
//        return "songs/update";
//    }
//
//    @PostMapping("update/{id}")
//    public String processUpdateSongForm(@PathVariable int id, @ModelAttribute @Valid Song updatedSong,
//                                        Errors errors, Model model){
//        if (errors.hasErrors()) {
//            model.addAttribute("title", "Update Song");
//            return "songs/update";
//        }
//
//        Song existingSong = MusicData.getById(id);
//        if(existingSong == null){
//            return "redirect:/songs";
//        }
//        existingSong.setTitle(updatedSong.getTitle());
//        existingSong.setMusician(updatedSong.getMusician());
//
//        return "redirect:/songs";
//    }
//    @GetMapping("delete/{id}")
//    public String deleteSong(@PathVariable int id){
//        songRepository.deleteById(id);
//        return "redirect:/songs";
//    }
//}

