import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    userRole: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const { username, email, mobileNumber, password, confirmPassword, userRole } = formData;
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!username || !email || !mobileNumber || !password || !confirmPassword || !userRole) {
      return 'All fields are required.';
    }
    if (!emailRegex.test(email)) {
      return 'Invalid email format.';
    }
    if (!mobileRegex.test(mobileNumber)) {
      return 'Invalid mobile number.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return '';
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setErrorMsg('');
    setShowModal(true);
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMsg(err.response?.data?.Message || "Signup failed");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Signup</h2>
      <input
        placeholder="Username *"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />
      <input
        placeholder="Email *"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />
      <input
        placeholder="Mobile Number *"
        value={formData.mobileNumber}
        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Password *"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Confirm Password *"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />
      <select
        value={formData.userRole}
        onChange={(e) => setFormData({ ...formData, userRole: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      >
        <option value="">Select Role *</option>
        <option value="Guide">Guide</option>
        <option value="Traveller">Traveller</option>
      </select>
      <button onClick={handleSubmit} style={{ padding: '10px', width: '100%' }}>Submit</button>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      {showModal && (
        <div style={{ border: '1px solid #ccc', padding: '20px', background: '#eee', display: 'inline-block' }}>
          <p>User created successfully!</p>
          <button onClick={handleModalClose}>OK</button>
        </div>
      )}
    </div>
  );
}

export default Signup;
