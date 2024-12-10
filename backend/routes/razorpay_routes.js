const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order for Razorpay
router.post("/create-order", async (req, res) => {
    const { totalAmount, currency = "INR", receipt, notes } = req.body;
  
    try {
      const options = {
        amount: totalAmount * 100, // Convert to paise
        currency: currency,
        receipt: receipt,
        notes: notes,
      };
  
      const order = await razorpay.orders.create(options);
      
      // Return the necessary details to the frontend
      res.status(200).json({
        order_id: order.id,       // Razorpay order ID
        amount: order.amount,     // Amount in paise
        currency: order.currency, // Currency
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating Razorpay order." });
    }
  });
  
module.exports=router;