const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config({ path: '../.env' });

const SHIPROCKET_API_BASE = process.env.SHIPROCKET_API_BASE; // Use the environment variable for the API base URL
let shiprocketToken = null; // Token storage (refresh as needed)

// Function to authenticate with Shiprocket and get a token
const authenticateShiprocket = async () => {
  try {
    const response = await axios.post(`${SHIPROCKET_API_BASE}/auth/login`, {
      email:  process.env.SHIPROCKET_EMAIL, // Replace with your Shiprocket email
      password: process.env.SHIPROCKET_PASSWORD, // Replace with your Shiprocket password
    });

    shiprocketToken = response.data.token;
  } catch (error) {
    throw new Error("Failed to authenticate with Shiprocket");
  }
};

// API route to create Shiprocket order
router.post("/shiprocket-order", async (req, res) => {
  try {
    // Authenticate if no token exists
    if (!shiprocketToken) await authenticateShiprocket();

    const orderDetails = req.body; // Receive order details from frontend

    // Call Shiprocket API to create the order
    const shiprocketOrderResponse = await axios.post(
      `${SHIPROCKET_API_BASE}/orders/create/adhoc`,
      orderDetails,
      {
        headers: {
          Authorization: `Bearer ${shiprocketToken}`,
        },
      }
    );


    res.status(200).json(shiprocketOrderResponse.data);
  } catch (error) {

    // Send error response to the client
    res.status(500).json({
      error: error.response?.data || "Internal Server Error",
    });
  }
});

module.exports = router;

