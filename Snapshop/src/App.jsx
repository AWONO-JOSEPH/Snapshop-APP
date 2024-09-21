import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/Login';
import RegistrationForm from '../src/pages/Registration.jsx'
import HomePage from '../src/pages/HomePage.jsx'
import LandingPage from '../src/pages/LandingPage.jsx'
import SellPage from '../src/pages/SellPage.jsx'
import ContactUs from './pages/Contact';
import ProfilePage from './pages/Profile';
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage/>} />
          <Route path="/Contact" element={<ContactUs />} />      
          <Route path="/Login" element={<LoginForm />} />      
          <Route path="/Registration" element={<RegistrationForm />} />    
          <Route path="/LandingPage" element={<LandingPage />} />    
          <Route path="/SellPage" element={<SellPage />} /> 
          <Route path="/Profile" element={<ProfilePage />} />   
      </Routes>
    </Router>
  );
}

export default App;