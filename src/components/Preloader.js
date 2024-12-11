import React, { useEffect, useState } from "react";
import "../css/Preloader.css";
import Culture from "../images/Culture.png"; // Import the logo image

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Hide preloader after 4 seconds
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null; // Hide the preloader when done

  return (
    <div className="preloader">
      <div className="tshirt-container">
        <img src={Culture} alt="Just Found Culture" className="tshirt" />
      </div>
      <div className="brand-name">Culture  Clothing</div>
    </div>
  );
};

export default Preloader;
