import React, { useState } from 'react';
import '../LandingStyles/ItemDetail.css';
import { FaChevronLeft, FaChevronRight, FaBookmark, FaShare, FaEllipsisH, FaTimes } from 'react-icons/fa';

function ItemDetail({ item, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % item.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + item.images.length) % item.images.length
    );
  };

  return (
    <div className="item-detail-overlay">
      <div className="item-detail">
        <div className="image-gallery">
          <button onClick={prevImage} className="nav-button left"><FaChevronLeft /></button>
          <img src={item.images[currentImageIndex]} alt={item.name} />
          <button onClick={nextImage} className="nav-button right"><FaChevronRight /></button>
          <div className="image-indicators">
            {item.images.map((_, index) => (
              <span 
                key={index} 
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
        <div className="item-info">
          <h2>{item.name}</h2>
          <p className="price">{item.price} • {item.availability}</p>
          <p className="location">Published in {item.location}</p>
          <div className="actions">
            <button className="primary-button">Send a message</button>
            <button className="icon-button"><FaBookmark /></button>
            <button className="icon-button"><FaShare /></button>
            <button className="icon-button"><FaEllipsisH /></button>
          </div>
          <div className="details">
            <h3>Details</h3>
            <p>{item.description}</p>
          </div>
          <div className="location-map">
            <h3>{item.location}</h3>
            <p>Location is approximate</p>
          </div>
          <div className="seller-message">
            <h3>Send a message to the seller</h3>
            <input type="text" placeholder="Hello, is this item still available?" />
            <button className="send-button">Send</button>
          </div>
        </div>
        <button onClick={onClose} className="close-button"><FaTimes /></button>
      </div>
    </div>
  );
}

export default ItemDetail;