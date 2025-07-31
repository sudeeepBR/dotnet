import React, { useState, useEffect } from 'react';
import PlaceForm from './PlaceForm';
import { getAllPlaces, deletePlace } from '../api';
import './ViewPlace.css'; // External CSS

function ViewPlace() {
  const [places, setPlaces] = useState([]);
  const [editingPlace, setEditingPlace] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getAllPlaces();
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, []);

  const handleDelete = async (index) => {
    const placeToDelete = places[index];
    if (window.confirm('Are you sure you want to delete this place?')) {
      try {
        await deletePlace(placeToDelete.placeId);
        const updatedPlaces = [...places];
        updatedPlaces.splice(index, 1);
        setPlaces(updatedPlaces);
      } catch (error) {
        console.error('Error deleting place:', error);
        alert('Failed to delete the place. Please try again.');
      }
    }
  };

  const handleEdit = (place, index) => {
    setEditingPlace({ ...place, index });
  };

  const handleUpdate = (updatedPlace) => {
    const updatedPlaces = [...places];
    updatedPlaces[editingPlace.index] = updatedPlace;
    setPlaces(updatedPlaces);
    setEditingPlace(null);
  };

  return (
    <div className="view-place-container">
      <h2>View Places</h2>

      {editingPlace ? (
        <PlaceForm
          isEdit={true}
          initialData={editingPlace}
          onSubmit={handleUpdate}
        />
      ) : (
        <>
          {places.length === 0 ? (
            <p className="no-places">Oops! No places found.</p>
          ) : (
            <ul className="place-list">
              {places.map((place, index) => (
                <li key={index} className="place-card">
                  <p><strong>ID:</strong> {place.placeId}</p>
                  <p><strong>Name:</strong> {place.name}</p>
                  <p><strong>Category:</strong> {place.category}</p>
                  <p><strong>Location:</strong> {place.location}</p>
                  <button onClick={() => handleEdit(place, index)}>Edit</button>
                  <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default ViewPlace;
