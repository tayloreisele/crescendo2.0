import { useState, useEffect } from 'react';
import axios from 'axios';

const useSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/songs/list');
        if (response.status === 200) {
          setSongs(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    };

    fetchSongs();
  }, []);

  return songs;
};

export default useSongs;