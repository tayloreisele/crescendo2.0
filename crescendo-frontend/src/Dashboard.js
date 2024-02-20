import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import SongTable from './components/SongTable';

function Dashboard() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const navigateToAddSong = () => {
        navigate('/addSong');
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <button onClick={navigateToAddSong} className="upload-button">Add Song</button>
            <p className='message'>{message}</p>
            {/* Render the SongTable component */}
            <SongTable />
        </div>
    );
};

export default Dashboard;
