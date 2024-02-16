import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
import Verify from './Verify';
import Dashboard from './Dashboard';
import CreateSongForm from './CreateSongForm'; // Import the CreateSongForm component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-song' element={<CreateSongForm />} /> {/* Add a new route for CreateSongForm */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
