import './App.css';
import React from 'react';
import Login from './Login';
import LandingPage from './LandingPage';
import Signup from './Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Verify from './Verify';
import Dashboard from './Dashboard';
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
        </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
