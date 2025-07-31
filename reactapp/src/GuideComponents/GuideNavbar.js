import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GuideNavbar.css'; // External CSS for styling

function GuideNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <div className="guide-navbar">
      <div className="navbar-left">
        <h1>Travel Tales</h1>
      </div>
      <div className="navbar-right">
        <Link to="/guide/home" className="nav-link">Home</Link>
        <Link to="/guide/add-place" className="nav-link">Add Place</Link>
        <Link to="/guide/view-place" className="nav-link">View Places</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
}

export default GuideNavbar;
