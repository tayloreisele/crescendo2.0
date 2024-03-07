import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import SongTable from './components/SongTable';
import { useAuth } from './AuthContext'; // Make sure to import useAuth

function Dashboard() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, login, logout } = useAuth(); // Use the isAuthenticated state

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/check', {
                    credentials: 'include', // Important for sessions
                });
                if (!response.ok) {
                    throw new Error('Not authenticated');
                }
                // If the response is OK, the user is authenticated
                login(); // Ensure the local auth state is set to authenticated
            } catch (error) {
                console.error('Authentication check failed:', error);
                logout(); // Ensure the local auth state is set to unauthenticated
                navigate('/login');
            }
        };

        checkAuthStatus();
    }, [navigate, login, logout]);

    const navigateToAddSong = () => {
        navigate('/addSong');
    };
    const navigateToEditLibrary = () => {
        navigate('/Editlibrary');
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <button onClick={navigateToAddSong} className="upload-button">Add Song</button>
            <button onClick={navigateToEditLibrary} className="edit-button">Edit Library</button>
            <p className='message'>{message}</p>
            <SongTable />
        </div>
    );
};

export default Dashboard;
