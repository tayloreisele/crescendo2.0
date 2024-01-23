package com.launchcode.crescendo.backend.models;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Objects;


public class Song {
    private int id;
    private static int nextId = 1;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 50, message = "Title must be between 3 and 50 characters")
    private String title;

    @NotBlank(message = "Musician/Show is required")
    @Size(min = 3, max = 50, message = "Musician/Show must be between 3 and 50 characters")
    private String musician;

    @Size(max = 500, message = "Notes too long! Must be at least 500 characters.")
    private String notes;

    public Song(String title, String musician, String notes) {
        this();
        this.title = title;
        this.musician = musician;
        this.notes = notes;
    }
    public Song() {
        this.id = nextId;
        nextId++;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMusician() {
        return musician;
    }

    public void setMusician(String musician) {
        this.musician = musician;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public int getId() {
        return id;
    }

}
