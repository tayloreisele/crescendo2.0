import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import SongTable from './components/SongTable'; // Import the SongTable component

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

    const uploadSheet = () => {
        document.getElementById('fileInput').click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
    
        // Get the token from local storage
        const token = localStorage.getItem('token');
    
        fetch('http://localhost:8080/upload', {
            method: 'POST',
            headers: {
                // Include the token in the Authorization header
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            setMessage('File uploaded successfully!');
            setSheets(oldSheets => [...oldSheets, data]);
        })
        .catch(error => {
            console.error(error);
            setMessage('File upload failed: ' + error.message);
        });
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
            <button onClick={uploadSheet} className="upload-button">Upload Sheet Music</button>
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
            {/* Adding the SongTable component */}
            <SongTable />
        </div>
    );
};

export default Dashboard;
