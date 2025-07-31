import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ErrorPage from './Components/ErrorPage';
import ProtectedRoute from './Components/ProtectedRoute';

import GuideNavbar from './GuideComponents/GuideNavbar';
import GuideHomePage from './GuideComponents/HomePage';
import PlaceForm from './GuideComponents/PlaceForm';
import ViewPlace from './GuideComponents/ViewPlace';

import TravellerNavbar from './TravellerComponents/TravellerNavbar';
import TravellerHomePage from './TravellerComponents/HomePage';
import TravellerViewPlace from './TravellerComponents/TravellerViewPlace';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
      {token && role === 'Guide' && <GuideNavbar />}
      {token && role === 'Traveller' && <TravellerNavbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/error" element={<ErrorPage />} />

        {/* Guide Routes */}
        {token && role === 'Guide' && (
          <>
            <Route path="/guide/home" element={
              <ProtectedRoute>
                <GuideHomePage />
              </ProtectedRoute>
            } />
            <Route path="/guide/add-place" element={
              <ProtectedRoute>
                <PlaceForm />
              </ProtectedRoute>
            } />
            <Route path="/guide/view-place" element={
              <ProtectedRoute>
                <ViewPlace />
              </ProtectedRoute>
            } />
          </>
        )}

        {/* Traveller Routes */}
        {token && role === 'Traveller' && (
          <>
            <Route path="/traveller/home" element={
              <ProtectedRoute>
                <TravellerHomePage />
              </ProtectedRoute>
            } />
            <Route path="/traveller/view-place" element={
              <ProtectedRoute>
                <TravellerViewPlace />
              </ProtectedRoute>
            } />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
