import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; //used to style table
import axios from 'axios'; // imported axios for making HTTP requests
import '../styles/SongTable.css';

const SongTable = () => {
  const [filteredSongs, setFilteredSongs] = useState([]); //stores the list of songs by id
  const [searchTerm, setSearchTerm] = useState(''); //stores search term
  const [showListAllButton, setShowListAllButton] = useState(false); // To show/hide the "List All" button
  const navigate = useNavigate(); //allows navigation between pages

  useEffect(() => {
    fetchSongs();
  }, []);

  // Fetches songs from backend server API
  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/songs/list');
      if (response.ok) {
        const data = await response.json();
        setFilteredSongs(data);
        // Initially hide the "List All" button
        setShowListAllButton(false);
      } else {
        console.error('Failed to get songs');
      }
    } catch (error) {
      console.error('Failed to fetch songs', error);
    }
  };

  // Function to search songs
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/songs/search?keyword=${searchTerm}`);
      setFilteredSongs(response.data);
      // Show the "List All" button after the search
      setShowListAllButton(true);
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  // Function to create new song
  const handleAddSong = () => {
    navigate('/addSong'); // Navigate to the add song form
  };

  // Function to handle "List All" button click
  const handleListAll = () => {
    fetchSongs(); // Fetch all songs again
    setSearchTerm(''); // Clear search term
    // Hide the "List All" button after resetting
    setShowListAllButton(false);
  };

  // Function to handle pressing the "Enter" key in the search input field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Call the search function when "Enter" key is pressed
    }
  };

  return (
    <div className="containerForSongTable">
      <h2 className="text-center">Your Music Repertoire</h2>
      <div className="search-container">
        <div>
          <button className="btn btn-primary mb-2" onClick={handleAddSong}>Add New Song</button>
        </div>
        <div className="search-input">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search By Song Title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} //updates the state of the searchTerm with the value entered by user
            onKeyPress={handleKeyPress} // Allows user to hit enter to search as well
          />
        </div>
        <div> 
          <button className="btn btn-primary mb-2" onClick={handleSearch}>Search</button>
          {/* Render the "List All" button only if showListAllButton is true */}
          {showListAllButton && <button className="btn btn-primary mb-2" onClick={handleListAll}>List All</button>}
        </div>
      </div> 
      <div className="table-container"> {/* Added a container for the table */}
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
    </div>
  );
}

export default SongTable;

