import React, { useState } from "react";
import '../PagesStyle/Login.css';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../components/store/store/api/Authentication'; 

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [login] = useLoginMutation(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const response = await login({ data: { username, password } }).unwrap();

        alert('Logged in Successfully');
        console.log('Token:', response.token); 
        
        // Store the token in local storage
        localStorage.setItem('user', JSON.stringify(response)); // Ensure the entire response is stored

        navigate('/LandingPage');
    } catch (error) {
        console.error('Error:', error);
        setError(error.data?.errors?.non_field_errors?.[0] || 'Login failed. Please check your credentials.');
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
                required 
              />
            </div>
            <div className="login-form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`login-form-input ${error ? "login-input-error" : ""}`}
                required 
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