import React from "react";
import { Link } from 'react-router-dom';
import './App.css';

function LandingPage() {
  return (
    <div>
        <h1>Welcome to Crescendo</h1>
        <div className="links-container">
            <Link to="/signup" className="link-button">Sign Up</Link>
            <Link to="/login" className="link-button">Login</Link>
        </div>
    </div>
  );
}

export default LandingPage;