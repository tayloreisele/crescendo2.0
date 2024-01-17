package com.launchcode.crescendo.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserHomeController {
    @GetMapping("/user")
    /* @ResponseBody because I'm using text right now */
    @ResponseBody
    public String renderUserHomePage (Model model) {
        model.addAttribute("home", "Welcome Username");
        return "You have arrived at your user home screen";
    }
}
 /* List <String>libraryOfSongs=new ArraryList<>(library.values()); */