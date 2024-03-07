import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/SongTable.css';
// import EditLibrary from './EditLibrary';

const SongTable = () => {
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showListAllButton, setShowListAllButton] = useState(false);
  const navigate = useNavigate();


  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/songs/list', {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Fetched songs:", response.data); // Add this line to inspect the fetched data
        setFilteredSongs(response.data);
        setShowListAllButton(false);
      } else {
        console.error('Failed to get songs');
      }
    } catch (error) {
      console.error('Failed to fetch songs', error);
    }
  };


  useEffect(() => {
    fetchSongs();
  }, []);



  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/songs/search?keyword=${searchTerm}`, {
        withCredentials: true,
      });
      setFilteredSongs(response.data);
      setShowListAllButton(true);
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  const handleAddSong = () => {
    navigate('/addSong');
  };

  const handleListAll = () => {
    fetchSongs();
    setSearchTerm('');
    setShowListAllButton(false);
  };

  const getSpotifyLink = (trackId) => {
    return `https://open.spotify.com/track/${trackId}`;
  };



  const toggleFavorite = async (songId) => {
    try {
      await axios.put(`http://localhost:8080/api/songs/${songId}/favorite`, {}, {
        withCredentials: true,
      });
      // After toggling, refresh the song list
      fetchSongs();
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };


  const [showFavorites, setShowFavorites] = useState(false);
  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div className="containerFor">
      <h2 className="text-center">Your Music Repertoire</h2>
      <div className="search-container">
        <div>
          <button className="btn btn-primary mb-2" onClick={handleAddSong}>Add New Song</button>
          <button className="btn btn-primary mb-2" onClick={handleShowFavorites}>
            {showFavorites ? "Show All Songs" : "Show Favorites"}
          </button>
        </div>
        <div className="search-input">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search By Song Title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-primary mb-2" onClick={handleSearch}>Search</button>
          {showListAllButton && <button className="btn btn-primary mb-2" onClick={handleListAll}>List All</button>}
        </div>
      </div>
      <div className="container">
        <table className="table table-bordered table-striped table-advanced table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Musician/Show</th>
              <th>Notes</th>
              <th>Listen on Spotify</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs
            .filter(song => !showFavorites || song.favorite)
            .map(song => (
              <tr key={song.id} onClick={() => navigate(`/song/${song.id}`)} style={{ cursor: 'pointer' }}>
                <td>{song.title}</td>
                <td>{song.musician}</td>
                <td>{song.notes}</td>
                <td>
                  {song.spotifyTrackId && <a href={getSpotifyLink(song.spotifyTrackId)} target="_blank" rel="noopener noreferrer">Listen</a>}
                </td>
                <td onClick={(e) => { e.stopPropagation(); toggleFavorite(song.id); }}>
                  {song.favorite ? '★' : '☆'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongTable;
