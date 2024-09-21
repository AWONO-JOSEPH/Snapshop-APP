import React from 'react';
import '../ComponentStyles/NewsletterSignup.css';

function NewsletterSignup() {
  return (
    <section className="newsletter">
      <h2>Subscribe to Our Newsletter</h2>
      <form>
        <input type="email" placeholder="Enter your email" required />
        <button type="submit" className="btn-primary">Subscribe</button>
      </form>
    </section>
  );
}

export default NewsletterSignup;