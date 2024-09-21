import React from 'react';
import '../ComponentStyles/Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2024 Snapshop. All rights reserved.</p>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;