const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Changed from 'bcrypt' to 'bcryptjs'
const User = require('../models/User'); // Adjust path as necessary
var jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../.env' });
const jwt_s = process.env.JWT_SECRET;

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10); // This remains the same
    const secpass = await bcrypt.hash(password, salt); // Hash the password

    // Create and save the new user
    let user = await User.create({
      email: req.body.email,
      password: secpass,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const auth_token = jwt.sign(data, jwt_s);
    res.json({ auth_token });

    // res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Signup required' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password); // This remains the same
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Login successful
    const data = {
      user: {
        id: user.id,
      },
    };
    const auth_token = jwt.sign(data, jwt_s);
    res.json({ message: 'Login successful', auth_token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


//Logout route
router.post('/logout', (req, res) => {
  try {
    // Since JWT is stateless, the server doesn't need to do anything to invalidate the token.
    // The logout process is handled client-side (removing the token from localStorage or cookies).
    
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
