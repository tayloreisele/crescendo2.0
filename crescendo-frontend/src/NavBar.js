import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './Logo.png';
import { useAuth } from './AuthContext';

function NavBar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate('/');
    };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <p className="brand-name">Crescendo</p>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <button onClick={handleLogout} className="nav-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;