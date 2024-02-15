import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; //needed to style table



const SongTable = () => {
  // Stores the list of songs
  const [songs, setSongs] = useState([]);

  // Function to fetch songs from the server
  const fetchSongs = async () => {
    try {
      // Fetch songs from the server API
      const response = await fetch('http://localhost:8080/songs');
      if (response.ok) {
        // If the response is successful, set the fetched data to the state
        const data = await response.json();
        setSongs(data);
      } else {
        // Handle error if fetching fails
        console.error('Failed to get songs');
      }
    } catch (error) {
      // Handle errors during the fetch operation
      console.error('Failed to fetch songs', error);
    }
  };

  // Use effect to fetch songs when the component mounts
  useEffect(() => {
    fetchSongs();
  }, []);

  function createNewSong (){
    Navigate('/song')
  }

  return (
    <div className="container">
      <h2 className="text-center">Your Music Repertoire</h2>
      <button className = "btn btn-primary mb-2" onClick={createNewSong}>Add New Song</button>
      <table className="table table-bordered table-striped table-advanced table-hover">
              <thead>                
          <tr>
            <th>Title</th>
            <th>Musician/Show</th>
            <th>Notes</th>                
          </tr>
        </thead>
        <tbody>
          {songs.map(song => (
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

