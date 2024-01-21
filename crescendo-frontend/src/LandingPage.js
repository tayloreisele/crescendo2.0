import React from "react";
import { Link } from 'react-router-dom';
import './App.css';

function LandingPage() {
    return (
        <div>
            <h1>Welcome to Crescendo</h1>
            <div className="link-container">
              <Link to="/signup">Sign Up</Link>
            </div>
            <div className="link-container">
              <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

export default LandingPage;