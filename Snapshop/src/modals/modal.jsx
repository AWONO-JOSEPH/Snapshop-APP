// src/components/Modal.jsx
import React from 'react';
import './Modal.css'; // Import CSS for styling

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times; {/* Close button */}
        </button>
        <h2>{title}</h2>
        {children} {/* Render children inside the modal */}
      </div>
    </div>
  );
}

export default Modal;