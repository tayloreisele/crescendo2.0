import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
import Verify from './Verify';
import Dashboard from './Dashboard';
Create-Song-Form
import CreateSongForm from './CreateSongForm'; // Import the CreateSongForm component

// Styling-song-table
import SongTable from './components/SongTable';
import AddSong from './pages/AddSong';



import NavBar from './NavBar';
import { AuthProvider } from './AuthContext';



function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/dashboard' element={<Dashboard />} />
Create-Song-Form
          <Route path='/create-song' element={<CreateSongForm />} /> {/* Add a new route for CreateSongForm */}

          <Route path='/SongTable' element={<SongTable />} />
          <Route path='/AddSong' element={<AddSong />} />

        </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
