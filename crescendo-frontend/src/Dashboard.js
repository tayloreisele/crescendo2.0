import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Dashboard() {
    const [sheets, setSheets] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        fetch('http://localhost:8080/files')
        .then(response => response.json())
        .then(data => setSheets(data))
        .catch(error => console.log(error));
    }, []);

    const navigateToAddSong = () => {
        navigate('/addSong');
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <button onClick={navigateToAddSong} className="upload-button">Add Song</button>
            <p className='message'>{message}</p>
            <div className="sheets">
                {sheets.map(sheet => (
                    <div key={sheet.id} className="sheet">
                        {sheet.fileType && sheet.data && (
                        <img src={`data:${sheet.fileType};base64,${sheet.data}`} alt={sheet.fileName} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;