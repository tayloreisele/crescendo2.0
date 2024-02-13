import React from "react";
import { Link } from 'react-router-dom';
import './App.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="spacer"></div>
      <div className="bento-box">
          <h1>Welcome to Crescendo</h1>
          <h3>All your sheet music, right at your fingertips</h3>
          <p>Sign up for free, or log into your account.</p>
          <div className="links-container">
              <Link to="/signup" className="link-button">Sign Up</Link>
              <Link to="/login" className="link-button">Login</Link>
          </div>
      </div>
    </div>
  );
}

export default LandingPage;