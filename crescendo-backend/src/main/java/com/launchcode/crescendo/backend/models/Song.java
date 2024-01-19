package com.launchcode.crescendo.backend.models;


import java.util.Objects;

public class Song {
    private int id;
    private static int nextId = 1;

    private String title;

    private String musician;

    public Song(String title, String musician) {
        this();
        this.title = title;
        this.musician = musician;
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
    public int getId() {
        return id;
    }

}
