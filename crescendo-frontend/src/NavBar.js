import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './Logo.png';
import { useAuth } from './AuthContext';
import axios from 'axios';

function NavBar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
        localStorage.removeItem('token');
        logout();
        navigate('/')
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <p className="brand-name">Crescendo</p>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link1">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="nav-link1">Dashboard</Link>
            <button onClick={handleLogout} className="nav-link1">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link1">Login</Link>
            <Link to="/signup" className="nav-link1">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;