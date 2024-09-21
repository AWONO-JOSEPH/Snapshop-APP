import React from 'react';
import '../ComponentStyles/Testimonials.css';

// Import images
import TailorImage from '../assets/tailor.jpg';
import Tailor2Image from '../assets/tailor2.jpg';
import Tailor3Image from '../assets/tailor3.jpg';

function Testimonials() {
  const testimonials = [
    { id: 1, name: 'Megne Anne', text: 'Great marketplace! Highly recommend.', image: TailorImage },
    { id: 2, name: 'Leaticia Kamgo', text: 'Amazing deals and customer service.', image: Tailor2Image },
    { id: 3, name: 'Arthur Tchoumtche', text: 'My customers increased significantly', image: Tailor3Image },
  ];

  return (
    <div className="testimonials">
      <h2>Hear from Our Marketplace Sellers</h2>
      <div className="testimonial-list">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial">
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-name">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;