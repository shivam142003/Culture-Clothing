const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const path = require('path'); // Required to serve static files from src/image

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongo();

// Serve static files from the "src/image" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/auth', require('./routes/auth_routes'));          // Separate auth routes for clarity
app.use('/api', require('./routes/cart_routes'));          // Separate cart routes for clarity
app.use('/api/products', require('./routes/product_routes'));   // Product routes are directly under /products
app.use('/api', require("./routes/shiprocket_routes"));
app.use("/api",require("./routes/razorpay_routes"));


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
