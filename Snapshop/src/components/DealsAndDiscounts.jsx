import React from 'react';
import '../ComponentStyles/DealsAndDiscounts.css';
import imageSearch from '../assets/Visual-search.jpg'; 
import marketplace from '../assets/marketplace.jpg';
import local from '../assets/local.jpg';

function DealsAndDiscounts() {
  const services = [
    {
      id: 1,
      title: 'Advanced Image Search',
      description: 'Easily find what you’re looking for with our advanced image search feature. Just upload an image or use keywords to discover similar products in seconds. Save time and shop smarter!',
      image: imageSearch,
    },
    {
      id: 2,
      title: 'Marketplace',
      description: '  Join our vibrant marketplace where local sellers and buyers connect. Explore a wide range of products from your community, support small businesses, and find unique items you won’t see anywhere else!',
      image: marketplace,
    },
    {
      id: 3,
      title: 'Embrace Locally Manufactured Products',
      description: 'Choosing locally manufactured products supports our community, economy, and environment. Join us in promoting local businesses and quality craftsmanship.',
      image: local,
    },
  ];

  return (
    <section className="deals">
      <h2>Our Services</h2>
      <div className="services-list">
        {services.map(service => (
          <div className="service" key={service.id}>
            <img src={service.image} alt={service.title} className="service-image" />
            <div className="service-details">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className="btn-primary">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DealsAndDiscounts;