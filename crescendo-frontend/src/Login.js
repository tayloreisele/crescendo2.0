import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { useAuth } from './AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async event => {
        event.preventDefault();

        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            // Login was successful
            // localStorage.setItem('token', data.token); // Stores the token to continue user session
            login();
            setMessage('Login successful!');
            navigate('/dashboard');  // Redirect to the dashboard
            console.log(data);
            console.log(data.token);
        } else {
            // There was an error
            setMessage(data.message);
        }
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" className='link-button'>Login</button>
            </form>
            {message && <p className='message'>{message}</p>}
        </div>
    );
}

export default Login;