import React from 'react';
import GuideNavbar from './GuideNavbar';
import './GuideHomePage.css'; // External CSS for styling

function GuideHomePage() {
  return (
    <div>
      <GuideNavbar />
      <div className="guide-home-container">
        <h2 className="guide-home-title">Welcome to Travel Tales - Guide Portal</h2>
        <p className="guide-home-description">
          Share amazing places with travellers and help them plan their next adventure.
        </p>
      </div>
    </div>
  );
}

export default GuideHomePage;
