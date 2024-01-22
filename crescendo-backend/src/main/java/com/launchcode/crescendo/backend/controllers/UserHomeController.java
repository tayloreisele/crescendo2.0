package com.launchcode.crescendo.backend.controllers;

import com.launchcode.crescendo.backend.data.MusicData;
import com.launchcode.crescendo.backend.models.Song;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;


import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("songs")
public class UserHomeController {

    @GetMapping
    public String displayUserSongs (Model model) {
        model.addAttribute("title","Your Library");
        model.addAttribute("songs", MusicData.getAll());
        return "songs/index";
    }
    @GetMapping("create")
    public String displayAddSongForm(Model model){
        model.addAttribute("title","Add new song");
        model.addAttribute(new Song());
        return "songs/create";
    }
    @PostMapping("create")
    public String processAddSongForm(@ModelAttribute @Valid Song newSong,
                                         Errors errors, Model model) {
        if(errors.hasErrors()) {
            model.addAttribute("title", "Add new song");
            return "songs/create";
        }
        MusicData.add(newSong);
        return "redirect:/songs";
    }
}
