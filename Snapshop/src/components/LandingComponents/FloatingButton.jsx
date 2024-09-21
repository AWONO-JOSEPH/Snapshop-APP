import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaGalacticRepublic, FaPlus } from 'react-icons/fa'; 
import '../LandingStyles/FloatingButton.css';

function FloatingButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/SellPage'); 
  };

  return (
    <button className="floating-button" onClick={handleClick}>
      <FaGalacticRepublic />
    </button>
  );
}

export default FloatingButton;