import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './pages/Login';
import RegistrationForm from '../src/pages/Registration.jsx'
import HomePage from '../src/pages/HomePage.jsx'
import LandingPage from '../src/pages/LandingPage.jsx'
import SellPage from '../src/pages/SellPage.jsx'
import ContactUs from './pages/Contact';
import ProfilePage from './pages/Profile';
import ArticlesSold from './pages/ArticlesSold';
import ArticlesBought from './pages/ArticlesBought';
import Messages from './pages/Messages';
import Wishlist from './pages/Wishlist';
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/sellpage" element={<ProtectedRoute><SellPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/articles-sold" element={<ProtectedRoute><ArticlesSold /></ProtectedRoute>} />
        <Route path="/articles-bought" element={<ProtectedRoute><ArticlesBought /></ProtectedRoute>} />
        <Route path="/messages/:id" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;