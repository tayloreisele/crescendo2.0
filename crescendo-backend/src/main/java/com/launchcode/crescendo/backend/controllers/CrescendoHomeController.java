package com.launchcode.crescendo.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CrescendoHomeController {
    @GetMapping("/")
    @ResponseBody
    public String renderHomePage (Model model){
        model.addAttribute("headingText", "Crescendo");
        return "Crescendo Sign In Page";
    }
}
