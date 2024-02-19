import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddSong.css';
import '../images/EmptyStage.jpg';

const AddSong = () => {
    const navigate = useNavigate();
    const [song, setSong] = useState({ title:'', musician:'', notes:'', spotifyTrackId:'', file: null });
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Submit form data including the file
            const formData = new FormData();
            formData.append('title', song.title);
            formData.append('musician', song.musician);
            formData.append('notes', song.notes);
            formData.append('spotifyTrackId', song.spotifyTrackId);
            formData.append('file', song.file);

            const response = await axios.post('http://localhost:8080/api/songs/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setMessage('New Song Added');
                navigate('/SongTable');
                setSong({ title: '', musician: '', notes: '', spotifyTrackId: '', file: null });
            } else {
                setMessage('Failed to add song');
            }
        } catch (error) {
            console.error('Error adding song:', error);
            setMessage('Failed to add song');
        }
    };

    const handleFileChange = (event) => {
        setSong({ ...song, file: event.target.files[0] });
    };

    const handleSearch = async () => {
        try {
            const response = await axios.post('/api/searchSpotify', { query });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching Spotify:', error);
        }
    };

    return (
        <div className="background-image-container">
            <div className="center-container"> 
                <div className="song-container-big"> 
                    <div className="newSong-div">
                        <h2>Create New Song</h2>
                        <form className="newSongForm" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={song.title}
                                onChange={(e) => setSong({ ...song, title: e.target.value })}
                                placeholder="Title"
                                required
                            />
                            <input
                                type="text"
                                value={song.musician}
                                onChange={(e) => setSong({ ...song, musician: e.target.value })}
                                placeholder="Musician/Show"
                                required
                            />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search Spotify"
                            />
                            <button type="button" onClick={handleSearch}>Search</button>
                            <ul>
                                {searchResults.map((result) => (
                                    <li key={result.id}>
                                        {result.name} - {result.artist}
                                        <button type="button" onClick={() => setSong({ ...song, spotifyTrackId: result.id })}>Select</button>
                                    </li>
                                ))}
                            </ul>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                required
                            />
                            <input
                                type="text"
                                value={song.notes}
                                onChange={(e) => setSong({ ...song, notes: e.target.value })}
                                placeholder="Notes"
                            />
                            <button type="submit" className='create-button'>Create</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSong;