import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const loginUser = (email, password) => {
  return axios.post(`${API_BASE_URL}/login`, { email, password });
};

export const registerUser = (userData) => {
  return axios.post(`${API_BASE_URL}/register`, userData);
};

export const getAllPlaces = () => {
  return axios.get(`${API_BASE_URL}/place`, { headers: getAuthHeaders() });
};

export const addPlace = (placeData) => {
  return axios.post(`${API_BASE_URL}/place`, placeData, { headers: getAuthHeaders() });
};

export const updatePlace = (placeId, placeData) => {
  return axios.put(`${API_BASE_URL}/place/${placeId}`, placeData, { headers: getAuthHeaders() });
};

export const deletePlace = (placeId) => {
  return axios.delete(`${API_BASE_URL}/place/${placeId}`, { headers: getAuthHeaders() });
};
