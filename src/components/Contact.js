import React from 'react';
import '../css/ContactForm.css';
 
export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-box">
        <h1>&bull; Contact Us &bull;</h1>
        <div className="contact-underline"></div>
        <p>Mail us at : <a href="mailto:example@example.com">example@example.com</a></p>
        <p> Instagram us at : <a href="https://www.instagram.com/justfoundculture/" target="_blank" rel="noopener noreferrer">justfoundculture</a></p>
        <p>Call us at : <a href="tel:+1234567890">987654321</a></p>
      </div>
    </div>
  );
}
