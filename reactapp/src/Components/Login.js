import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import './Login.css'; // External CSS for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      const response = await loginUser(email, password);
      const { token, role } = response.data.token;

      if (!token || !role) {
        throw new Error("Invalid response from server");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "Guide") {
        navigate("/guide/home");
      } else if (role === "Traveller") {
        navigate("/traveller/home");
      } else {
        throw new Error("Unknown role");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg(err.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="login-form">
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">Login</button>
        {errorMsg && <p className="error-text">{errorMsg}</p>}
      </div>
      <div className="signup-link">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
