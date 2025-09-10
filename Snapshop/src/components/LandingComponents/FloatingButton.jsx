import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaPlus } from 'react-icons/fa'; 
import '../LandingStyles/FloatingButton.css';

function FloatingButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/SellPage'); 
  };

  return (
    <div className="floating-button-wrapper">
      <button
        type="button"
        className="floating-button"
        aria-label="Sell an item"
        title="Sell an item"
        onClick={handleClick}
      >
        <FaPlus aria-hidden="true" />
      </button>
      <span className="floating-button__tooltip">Sell an item</span>
    </div>
  );
}

export default FloatingButton;