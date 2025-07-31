import React, { useState } from 'react';
import { addPlace, updatePlace } from '../api';
import './PlaceForm.css'; // External CSS

function PlaceForm({ isEdit = false, initialData = {}, onSubmit }) {
  const [place, setPlace] = useState({
    placeId: initialData.placeId || '',
    name: initialData.name || '',
    category: initialData.category || '',
    bestTimeToVisit: initialData.bestTimeToVisit || '',
    placeImage: initialData.placeImage || '',
    location: initialData.location || '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const categories = ['Beach', 'Mountain', 'Historical', 'Adventure', 'City', 'Nature'];

  const handleChange = (e) => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, category, bestTimeToVisit, placeImage, location } = place;
    if (!name || !category || !bestTimeToVisit || !placeImage || !location) {
      setErrorMsg('All fields are required.');
      return;
    }

    try {
      const payload = {
        ...place,
        placeId: isEdit ? parseInt(place.placeId, 10) : 0,
      };

      if (isEdit) {
        await updatePlace(payload.placeId, payload);
      } else {
        await addPlace(payload);
      }

      setErrorMsg('');
      if (onSubmit) onSubmit(place);
      alert(isEdit ? 'Place updated successfully!' : 'Place added successfully!');
    } catch (err) {
      console.error("Error adding/updating place:", err);
      setErrorMsg('Failed to add/update place. Please try again.');
    }
  };

  return (
    <div className="place-form-container">
      <h2>{isEdit ? 'Edit Place' : 'Create New Place'}</h2>
      {isEdit && (
        <div className="place-id-display">
          <strong>Place ID:</strong> {place.placeId}
        </div>
      )}
      <input
        name="name"
        placeholder="Name *"
        value={place.name}
        onChange={handleChange}
      />
      <select
        name="category"
        value={place.category}
        onChange={handleChange}
      >
        <option value="">Select Category *</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        name="bestTimeToVisit"
        placeholder="Best Time to Visit *"
        value={place.bestTimeToVisit}
        onChange={handleChange}
      />
      <input
        name="placeImage"
        placeholder="Image URL *"
        value={place.placeImage}
        onChange={handleChange}
      />
      <input
        name="location"
        placeholder="Location *"
        value={place.location}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>
        {isEdit ? 'Update Place' : 'Add Place'}
      </button>
      {errorMsg && <p className="error-text">{errorMsg}</p>}
    </div>
  );
}

export default PlaceForm;
