import React, { useState } from 'react';
import '../PagesStyle/Contact.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page-container">
      <section className="contact-form-section">
        <h2 className="contact-form-title">Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              required
              className="contact-form-input"
            />
          </div>
          <div className="contact-form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              required
              className="contact-form-input"
            />
          </div>
          <div className="contact-form-group">
            <textarea
              id="message"
              name="message"
              placeholder='Message'
              value={formData.message}
              onChange={handleChange}
              required
              className="contact-form-textarea"
            ></textarea>
          </div>
         <center> <button type="submit" className="contact-form-submit">Send Message</button></center>
        </form>
      </section>
    </div>
  );
}

export default ContactUs;