const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Setup multer for image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images'); // Path where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage }).array('images', 5); // Allow multiple files, max 5 images


// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router for trending products
router.get('/trending', async (req, res) => {
  try {
    const products = await Product.find({ trending: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a product by productId
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ productId: productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new product with image upload
router.post('/addproduct', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: `Error uploading images: ${err.message}` });
    }

    try {
      const { title, description, care, composition, shipping, price } = req.body;

      // Map over the uploaded files and generate the image URLs
      const images = req.files ? req.files.map(file => `/images/${file.filename}`) : [];

      const newProduct = new Product({
        title,
        description,
        care: care ? care.split(',').map(item => item.trim()) : [],
        composition: composition ? composition.split(',').map(item => item.trim()) : [],
        shipping: shipping ? shipping.split(',').map(item => item.trim()) : [],
        price,
        images,
      });

      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(400).json({ message: `Error creating product: ${error.message}` });
    }
  });
});

//route to delete product
router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    // Find the product by ID and delete it
    const product = await Product.findByIdAndDelete(productId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


//route to edit product
router.put('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { title, price, care, composition, shipping, images,trending,discount} = req.body;

  try {
    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { title, price, care, composition, shipping, images,trending,discount },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


