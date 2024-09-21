import React from 'react';
import '../ComponentStyles/HeroSection.css';
import fcimage from "../assets/image.png"


function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Snapshop</h1>
        <p>Discover the best deals and products in one place.</p>
        <div className="hero-buttons">
        <a href="/login" className="btn-primary">Shop Now</a>
        </div>
      </div>

    </section>
  );
}

export default HeroSection;