package com.launchcode.crescendo.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CrescendoSignInController {
    @GetMapping("/")
    /* @ResponseBody because I'm using text right now */
    @ResponseBody
    public String displayHomePage (Model model){
        /* model.addAttribute("headingText", "Crescendo");*/
        return "Crescendo Sign In Page";
    }
}
