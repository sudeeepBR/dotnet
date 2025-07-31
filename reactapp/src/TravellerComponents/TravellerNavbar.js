import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TravellerNavbar.css'; // Ensure this CSS file exists

function TravellerNavbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Traveller';
  const role = localStorage.getItem('role') || 'Traveller';

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <nav className="traveller-navbar">
      <div className="navbar-left">
        <span className="navbar-welcome">Welcome, {username} ({role})</span>
      </div>
      <div className="navbar-links">
        <Link to="/traveller/home">Home</Link>
        <Link to="/traveller/view-place">View Places</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
}

export default TravellerNavbar;
