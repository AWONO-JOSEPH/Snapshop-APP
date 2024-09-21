// src/components/Header.jsx
import React, { useState } from 'react';
import '../ComponentStyles/Header.css';
import image from "../assets/e2a5cb54890807.596e14265eb03.png"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="ss-header">
      <nav className="ss-nav">
        <div className="ss-logo-container">
          <div className="ss-logo-image">
            <img src={image} alt="SnapShop logo" />
          </div>
          <div className="ss-logo-text">
            <a href="/">Snapshop</a>
          </div>          
        </div>
        
        <button className="ss-menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`ss-nav-list ${isMenuOpen ? 'ss-nav-list-open' : ''}`}>
          <li className="ss-nav-item"><a href="/" className="ss-nav-link">Home</a></li>
          <li className="ss-nav-item"><a href="#" className="ss-nav-link">About</a></li>
          <li className="ss-nav-item"><a href="/Contact" className="ss-nav-link">Contact</a></li>
          <li className="ss-nav-item"><a href="/Login" className="ss-nav-link">Login</a></li>
          <li className="ss-nav-item"><a href="/Registration" className="ss-nav-link">Register</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;