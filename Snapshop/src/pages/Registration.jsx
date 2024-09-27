import React, { useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../PagesStyle/Registration.css';
import { useRegisterMutation } from '../components/store/store/api/Authentication'; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    DOB: '',
    username: '',
    Town: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [register] = useRegisterMutation(); // Use the register mutation hook
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.first_name) formErrors.first_name = 'First name is required';
    if (!formData.last_name) formErrors.last_name = 'Last name is required';
    if (!formData.DOB) formErrors.DOB = 'Date of birth is required';
    if (!formData.username) formErrors.username = 'Username is required';
    if (!formData.Town) formErrors.Town = 'Town is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email is invalid';
    if (!formData.password) formErrors.password = 'Password is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Call the register mutation
        const response = await register({ data: formData }).unwrap();
        
        setSuccessMessage('Registration successful! Please check your email to verify your account.');
        console.log('Form submitted successfully', response);
        
        // Reset form fields
        setFormData({
          first_name: '',
          last_name: '',
          DOB: '',
          username: '',
          Town: '',
          email: '',
          password: ''
        });
        setErrors({});
        
        // Navigate to login page after successful registration
        navigate('/login');
      } catch (error) {
        console.error('There was an error submitting the form!', error);
        // Handle errors based on the API response structure
        setErrors({ submit: error.data?.errors?.non_field_errors?.[0] || 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <>
      <div className="registration-page-container">
        <div className="registration-content-wrapper">
          <div className="registration-promo-section">
            <div className="registration-promo-content">
              <h1 className="registration-brand">Snapshop</h1>
              <p className="registration-promo-text">Shop Smarter, Not Harder - Just Snap, Search, and Shop with our Image-Powered Marketplace</p>
              <p className="registration-promo-subtext">DISCOVER AND SHOP INSTANTLY WITH SNAPSHOP</p>
            </div>
          </div>
          <div className="registration-form-section">
            <form className="registration-form" onSubmit={handleSubmit}>
              <h2 className="registration-form-title">Create an account</h2>
              {successMessage && <p className="registration-success-text">{successMessage}</p>}
              {errors.submit && <p className="registration-error-text">{errors.submit}</p>}
              <div className="registration-form-group registration-name-group">
                <div className="registration-name-input-wrapper">
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={`registration-form-input ${errors.first_name ? 'registration-input-error' : ''}`}
                  />
                  {errors.first_name && <p className="registration-error-text">{errors.first_name}</p>}
                </div>
                <div className="registration-name-input-wrapper">
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={`registration-form-input ${errors.last_name ? 'registration-input-error' : ''}`}
                  />
                  {errors.last_name && <p className="registration-error-text">{errors.last_name}</p>}
                </div>
              </div>
              <div className="registration-form-group">
                <input
                  type="date"
                  name="DOB"
                  placeholder="Date of Birth"
                  value={formData.DOB}
                  onChange={handleChange}
                  className={`registration-form-input ${errors.DOB ? 'registration-input-error' : ''}`}
                />
                {errors.DOB && <p className="registration-error-text">{errors.DOB}</p>}
              </div>
              <div className="registration-form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`registration-form-input ${errors.username ? 'registration-input-error' : ''}`}
                />
                {errors.username && <p className="registration-error-text">{errors.username}</p>}
              </div>
              <div className="registration-form-group">
                <select
                  name="Town"
                  value={formData.Town}
                  onChange={handleChange}
                  className={`registration-form-input ${errors.Town ? 'registration-input-error' : ''}`}
                >
                  <option value="">Select Town</option>
                  <option value="Buea">Buea</option>
                  <option value="Douala">Douala</option>
                  <option value="Yaounde">Yaounde</option>
                  <option value="Bamenda">Bamenda</option>
                </select>
                {errors.Town && <p className="registration-error-text">{errors.Town}</p>}
              </div>
              <div className="registration-form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`registration-form-input ${errors.email ? 'registration-input-error' : ''}`}
                />
                {errors.email && <p className="registration-error-text">{errors.email}</p>}
              </div>
              <div className="registration-form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`registration-form-input ${errors.password ? 'registration-input-error' : ''}`}
                />
                {errors.password && <p className="registration-error-text">{errors.password}</p>}
              </div>
              <button type="submit" className="registration-submit-btn">Sign up</button>
              <div className="registration-divider">
                <span>OR</span>
              </div>
              <p className="registration-signin-link">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;