import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Orderconfirmation.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleBackToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    setTimeout(() => {
      setShowConfetti(true);
    }, 1500); // Show confetti after the tick animation is complete
  }, []);

  return (
    <div className="order-success-container">
      <div className="animation">
        <div className="circle">
          <span className="checkmark">&#10003;</span>
        </div>
      </div>
      {showConfetti && (
        <div className="confetti">
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
        </div>
      )}
      <h1 className="success-message">Order Placed Successfully!</h1>
      <p>Your order has been placed. Thank you for shopping with us!</p>
      <button className="back-to-home-button" onClick={handleBackToHome}>
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
