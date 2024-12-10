import React from 'react'
import '../css/Marquee.css'
import tshirt1 from "../images/shop by apparel/tshirt1.jpeg";
import Hoodie1 from "../images/shop by apparel/Hoodie1.jpeg";
import jacket1 from "../images/shop by apparel/jacket1.jpeg";
import tshirt2 from "../images/shop by apparel/tshirt2.jpg";
import Hoodie2 from "../images/shop by apparel/hoodie2.jpeg";
import jacket2 from "../images/shop by apparel/jacket2.jpeg";
export default function Marquee() {
  return (
    <div className="company-container">
    <h2 className="company-title text-center">Shop by Apparel</h2>
    <div className="marquee-container">
      <div className="marquee-item">
        <div className="image-container-apparel">
          <img src={tshirt1} alt="T-shirts"/>
          <p className="image-title">T-shirts</p>
        </div>
        <div className="image-container-apparel">
          <img src={Hoodie1} alt="Hoodies" />
          <p className="image-title">Hoodies</p>
        </div>
        <div className="image-container-apparel">
          <img src={jacket1} alt="Jackets" />
          <p className="image-title">Jackets</p>
        </div>
        <div className="image-container-apparel">
          <img src={tshirt2} alt="T-shirts" />
          <p className="image-title">T-shirts</p>
        </div>
        <div className="image-container-apparel">
          <img src={Hoodie2} alt="Hoodies" />
          <p className="image-title">Hoodies</p>
        </div>
        <div className="image-container-apparel">
          <img src={jacket2} alt="Jackets" />
          <p className="image-title">Jackets</p>
        </div>
        {/* for repetetion */}
        <div className="image-container-apparel">
          <img src={tshirt1} alt="T-shirts" />
          <p className="image-title">T-shirts</p>
        </div>
        <div className="image-container-apparel">
          <img src={Hoodie1} alt="Hoodies" />
          <p className="image-title">Hoodies</p>
        </div>
        <div className="image-container-apparel">
          <img src={jacket1} alt="Jackets" />
          <p className="image-title">Jackets</p>
        </div>
        <div className="image-container-apparel">
          <img src={tshirt2} alt="T-shirts" />
          <p className="image-title">T-shirts</p>
        </div>
        <div className="image-container-apparel">
          <img src={Hoodie2} alt="Hoodies" />
          <p className="image-title">Hoodies</p>
        </div>
        <div className="image-container-apparel">
          <img src={jacket2} alt="Jackets" />
          <p className="image-title">Jackets</p>
        </div>
        <div className="image-container-apparel">
          <img src={tshirt1} alt="T-shirts" />
          <p className="image-title">T-shirts</p>
        </div>
        <div className="image-container-apparel">
          <img src={Hoodie1} alt="Hoodies" />
          <p className="image-title">Hoodies</p>
        </div>
        <div className="image-container-apparel">
          <img src={jacket1} alt="Jackets" />
          <p className="image-title">Jackets</p>
        </div>
        <div className="image-container-apparel">
          <img src={tshirt2} alt="T-shirts" />
          <p className="image-title">T-shirts</p>
        </div>
        <div className="image-container-apparel">
          <img src={Hoodie2} alt="Hoodies" />
          <p className="image-title">Hoodies</p>
        </div>
        <div className="image-container-apparel">
          <img src={jacket2} alt="Jackets" />
          <p className="image-title">Jackets</p>
        </div>
      </div>
    </div>
  </div>
  )
};