import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';//used to style table
import axios from 'axios'; // Import Axios for making HTTP requests

const SongTable = () => {
  //stores the list of songs
  const [songs, setSongs] = useState([]);
  //stores searchterm
  const [searchTerm, setSearchTerm] = useState('');
  //stores the filtered songs by id
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

// Fetchs songs from backend server API
  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:8080/songs');
      if (response.ok) {
        const data = await response.json();
        setSongs(data);
        setFilteredSongs(data); // Initialize filteredSongs with all songs
      } else {
        console.error('Failed to get songs');
      }
    } catch (error) {
      console.error('Failed to fetch songs', error);
    }
  };

// Function to create new song
  const createNewSong = () => {
    Navigate('/song');
  };

// Function to search songs
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/songs/search?keyword=${searchTerm}`);
      setFilteredSongs(response.data);
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Your Music Repertoire</h2>
      <button className="btn btn-primary mb-2" onClick={createNewSong}>Add New Song</button>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Search By Song Title..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
       <button className="btn btn-primary mb-2" onClick={handleSearch}>Search</button>
      <table className="table table-bordered table-striped table-advanced table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Musician/Show</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredSongs.map(song => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.musician}</td>
              <td>{song.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongTable;



