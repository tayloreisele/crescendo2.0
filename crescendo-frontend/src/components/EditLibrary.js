import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SongTable.css';

const EditLibrary = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/songs/list', {
        withCredentials: true,
      });      
      if (response.ok) {
        const data = await response.json();
        setSongs(data);
      } else {
        console.error('Failed to get songs');
      }
    } catch (error) {
      console.error('Failed to fetch songs', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editSong/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this song?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/songs/${id}`);
        // Remove the deleted song from the state
        setSongs(songs.filter(song => song.id !== id));
      } catch (error) {
        console.error('Error deleting song:', error);
      }
    }
  };

  return (
    <div>
      <h2>Edit Library</h2>
      <ul className="song-list">
        {songs.map((song) => (
          <li key={song.id}>
            {song.title} - {song.musician}
            <button onClick={() => handleEdit(song.id)}>Edit</button>
            <button onClick={() => handleDelete(song.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditLibrary;