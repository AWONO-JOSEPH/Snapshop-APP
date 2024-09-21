import React, { useState } from "react";
import '../PagesStyle/Login.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Logged in Successfully');
        console.log('Token:', data.token);
        navigate('/LandingPage');
      } else {
        setError(data.errors?.non_field_errors?.[0] || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-content-wrapper">
        <div className="login-form-section">
          <h2 className="login-form-title">Sign In</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-form-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`login-form-input ${error ? "login-input-error" : ""}`}
              />
            </div>
            <div className="login-form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`login-form-input ${error ? "login-input-error" : ""}`}
              />
            </div>
            {error && <p className="login-error-text">{error}</p>}
            <button type="submit" className="login-submit-btn">
              Login
            </button>
          </form>
          <p className="login-signup-link">
            Don't have an account? <a href="/Registration">Sign up here</a>
          </p>
        </div>
        <div className="login-promo-section">
          <div className="login-promo-content">
            <h1 className="login-brand">Snapshop</h1>
            <p className="login-promo-text">Shop Smarter, Not Harder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;