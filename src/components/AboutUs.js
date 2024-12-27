import React from 'react';
import '../css/About.css';
import tshirt3_1 from "../images/tshirt3(1).jpg";

export default function AboutUs() {
  return (
    <div className="container about-container">
      <div className="row align-items-center">
        {/* Image on the left */}
        <div className="col-md-4">
          <img src={tshirt3_1} alt="Found Culture" className="about-image img-fluid rounded" />
        </div>

        {/* Content on the right */}
        <div className="col-md-8">
          <div className="about-content">
            <h2 className='about-title'>About Culture clothing</h2>
            <p>
              Culture Clothing is a premium lifestyle and streetwear brand dedicated to celebrating individuality, creativity, and authenticity. Founded in [Year] by [Founder's Name(s)], 
              our brand merges contemporary fashion with the raw essence of street culture, making a bold statement in the fashion industry.
            </p>
            <p>
              Our mission is to bring together individuals who share a passion for fashion, art, and culture, offering them not only 
              unique clothing but also a sense of belonging. Culture clothing is not just a brand – it’s a community of like-minded 
              individuals who express their identity and values through the clothing they wear.
            </p>
            <p>
              Every product we create tells a story of craftsmanship, quality, and innovation. We pay close attention to every detail, 
              ensuring that each piece is a reflection of our commitment to the highest standards in design and production. At culture
              Clothing, we believe in providing exclusive, high-quality designs that not only enhance personal style but also create an impact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
