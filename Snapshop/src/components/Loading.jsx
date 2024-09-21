import React from 'react';
import '../ComponentStyles/Loading.css'; // Ensure to create this CSS file

function Loading() {
  return (
    <div className="loading-overlay">
        <div className="par"><p>Loading</p>
        </div>
      <div className="loading-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      
    </div>
  );
}

export default Loading;