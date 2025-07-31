import React, { useState } from 'react';
import './TravellerViewPlace.css'; // Ensure this CSS file exists

function TravellerViewPlace() {
  const [places] = useState([
    { name: 'Goa Beach', category: 'Beach', location: 'Goa' },
    { name: 'Manali Hills', category: 'Mountain', location: 'Himachal Pradesh' },
    { name: 'Hampi Ruins', category: 'Historical', location: 'Karnataka' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="traveller-view-container">
      <h2>Explore Places</h2>
      <input
        type="text"
        placeholder="Search by place name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredPlaces.length === 0 ? (
        <p className="no-places">Oops! No places found.</p>
      ) : (
        <ul className="place-list">
          {filteredPlaces.map((place, index) => (
            <li key={index} className="place-card">
              <strong>{place.name}</strong> - {place.category} - {place.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TravellerViewPlace;
