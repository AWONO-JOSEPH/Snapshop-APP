import React from 'react';

function HeroSection() {
  return (
    <section className="bg-blue-600 text-white h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Welcome to Our Landing Page</h1>
        <p className="mt-4 text-lg">Discover amazing features and benefits.</p>
        <button className="mt-6 bg-white text-blue-600 px-4 py-2 rounded">Get Started</button>
      </div>
    </section>
  );
}

export default HeroSection;