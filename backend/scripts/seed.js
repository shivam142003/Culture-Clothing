const mongoose = require('mongoose');
const Product = require('../models/Product');
const Counter = require('../models/Counter'); // Import the counter model

const products = [
  {
    title: 'Navy Materialistic T-Shirt',
    images: ['/images/tshirt1.jpg', '/images/tshirt1_2.jpg', '/images/tshirt1_3.jpg'],
    price: '$29.99',
    description: 'A stylish navy t-shirt made from high-quality material. Perfect for casual outings or lounging at home.',
    care: [
      'Machine wash at max. 30°C/86°F with short spin cycle',
      'Do not use bleach',
      'Iron at a maximum of 110°C/230°F',
      'Do not dry clean',
      'Do not tumble dry',
    ],
    composition: [
      '100% French Terry Cotton',
      'Silicone Washed to provide extra comfort',
      '240 GSM Oversized Fit',
      'Screen and Puff Print',
    ],
    shipping: [
      'Shipping within 3-5 business days.',
      'Free shipping on orders over $50.',
      'Returns accepted within 30 days.',
    ],
  },
  {
    title: 'Red Edition',
    images: ['/images/tshirt2_1.jpg', '/images/tshirt2_2.jpg'],
    price: 'Rs 3,999',
    description: 'A red t-shirt edition with a comfortable fit.',
    care: [
      'Machine wash at max. 30°C/86°F with short spin cycle',
      'Do not use bleach',
      'Iron at a maximum of 110°C/230°F',
      'Do not dry clean',
      'Do not tumble dry',
    ],
    composition: [
      '100% French Terry Cotton',
      'Silicone Washed to provide extra comfort',
      '240 GSM Oversized Fit',
      'Screen and Puff Print',
    ],
    shipping: [
      'Shipping within 3-5 business days.',
      'Free shipping on orders over $50.',
      'Returns accepted within 30 days.',
    ],
  },
  {
    title: 'Green Edition',
    images: ['/images/tshirt3_1.jpg', '/images/tshirt3_2.jpg'],
    price: 'Rs 5,499',
    description: 'A stylish green t-shirt made from high-quality material, perfect for casual outings or lounging at home.',
    care: [
      'Machine wash at max. 30°C/86°F with short spin cycle',
      'Do not use bleach',
      'Iron at a maximum of 110°C/230°F',
      'Do not dry clean',
      'Do not tumble dry',
    ],
    composition: [
      '100% French Terry Cotton',
      'Silicone Washed to provide extra comfort',
      '240 GSM Oversized Fit',
      'Screen and Puff Print',
    ],
    shipping: [
      'Shipping within 3-5 business days.',
      'Free shipping on orders over $50.',
      'Returns accepted within 30 days.',
    ],
  },
  {
    title: 'Blue Edition',
    images: ['/images/tshirt1.jpg', '/images/tshirt1_2.jpg', '/images/tshirt1_3.jpg'],
    price: 'Rs 6,499',
    description: 'A stylish navy t-shirt made from high-quality material. Perfect for casual outings or lounging at home.',
    care: [
      'Machine wash at max. 30°C/86°F with short spin cycle',
      'Do not use bleach',
      'Iron at a maximum of 110°C/230°F',
      'Do not dry clean',
      'Do not tumble dry',
    ],
    composition: [
      '100% French Terry Cotton',
      'Silicone Washed to provide extra comfort',
      '240 GSM Oversized Fit',
      'Screen and Puff Print',
    ],
    shipping: [
      'Shipping within 3-5 business days.',
      'Free shipping on orders over $50.',
      'Returns accepted within 30 days.',
    ],
  },
  {
    title: 'Red Edition',
    images: ['/images/tshirt2_1.jpg', '/images/tshirt2_2.jpg'],
    price: 'Rs 2,499',
    description: 'A stylish navy t-shirt made from high-quality material. Perfect for casual outings or lounging at home.',
    care: [
      'Machine wash at max. 30°C/86°F with short spin cycle',
      'Do not use bleach',
      'Iron at a maximum of 110°C/230°F',
      'Do not dry clean',
      'Do not tumble dry',
    ],
    composition: [
      '100% French Terry Cotton',
      'Silicone Washed to provide extra comfort',
      '240 GSM Oversized Fit',
      'Screen and Puff Print',
    ],
    shipping: [
      'Shipping within 3-5 business days.',
      'Free shipping on orders over $50.',
      'Returns accepted within 30 days.',
    ],
  },
];

// MongoDB connection
mongoose.connect('mongodb+srv://justfoundculture:Biggestbrand6070%24@cluster0.fvevo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany();

    // Fetch current productId from Counter
    const counter = await Counter.findOneAndUpdate(
      { name: 'productId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // If no counter exists, it will create one
    );

    let productId = counter.seq; // Start with the current productId

    // Assign productId to each product and insert them
    const updatedProducts = products.map(product => {
      return {
        ...product,
        productId: productId++, // Increment the productId for each product
      };
    });

    await Product.insertMany(updatedProducts); // Insert the products

    mongoose.connection.close();
  } catch (error) {
    mongoose.connection.close();
  }
};

seedDatabase();
