import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //allows navigation between pages
import '../styles/AddSong.css';
import '../images/EmptyStage.jpg';

// Function for adding new song
const AddSong = () => {
    const navigate = useNavigate();
    const [song, setSong] = useState({id:'', title:'', musician:'', notes:''}); // stores song details
    const [message, setMessage] = useState(''); //acts as console.log for errors

    // function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Send a POST request to the server to add the new song
        try {
            const response = await fetch('http://localhost:8080/api/songs/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(song),
            });

            if (response.ok) {
                setMessage('New Song Added');
                navigate('/SongTable'); // Navigate to the list of songs page
                setSong({ title: '', musician: '', notes: '' }); // Clear the form fields after successful addition
            } else {
                setMessage('Failed to add song');
            }
        } catch (error) {
            console.error('Error adding song:', error);
            setMessage('Failed to add song');
        }
    };
  
    return (
        <div className="background-image-container">
            
            <h2>Let's Build Your Stage</h2>
            
            <form onSubmit={handleSubmit}>
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
                    value={song.notes}
                    onChange={(e) => setSong({ ...song, notes: e.target.value })}
                    placeholder="Notes"
                />
                <button type="submit" className='link-button'>Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddSong;