package com.launchcode.crescendo.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity
public class Song {
    @Id /*This is a primary key*/
    @GeneratedValue /*Allows database to generate the values of our primary key*/
    private int id;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 50, message = "Title must be between 3 and 50 characters")
    private String title;

    @NotBlank(message = "Musician/Show is required")
    @Size(min = 3, max = 50, message = "Musician/Show must be between 3 and 50 characters")
    private String musician;

    @Size(max = 500, message = "Notes too long! Must be at least 500 characters.")
    private String notes;

    public Song(String title, String musician, String notes) {
        this.title = title;
        this.musician = musician;
        this.notes = notes;
    }
    public Song() {}

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
