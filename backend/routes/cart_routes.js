const express = require('express');
const router = express.Router();
const fetchuser=require("../middleware/Fetchuser");
const Cart=require("../models/Cart");

router.get('/cart',fetchuser, async (req, res) => {
    try {
        const userCart = await Cart.find({ userId: req.user.id }).populate('productId','size');
        // Find cart by user ID
        const cartItems = userCart.map(item => ({
          productId: item.productId, // productId (referencing the product)
          size: item.size,    // size of the product
          title: item.title,  // title of the product
          quantity: item.quantity,      // quantity added to the cart
          price: item.price   // price of the product
        }));
        res.json({ items: cartItems });
      // res.json({ items: userCart });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching cart items' });
    }
  });


// Route to check if a cart item exists using HEAD request
router.head('/cart/:productId/:size',fetchuser, async (req, res) => {
  const { productId, size } = req.params;
  const userId = req.user.id; // Assuming you have user authentication middleware

  try {
    // Check if the item with the specified productId, size, and userId exists in the cart
    const itemExists = await Cart.exists({ productId, size, userId });

    if (itemExists) {
      // If the item exists, return a 200 status without sending a response body
      return res.status(200).end();
    } else {
      // If the item doesn't exist, return a 404 status
      return res.status(404).end();
    }
  } catch (error) {
    // Return a 500 status if an error occurs during the database check
    return res.status(500).end();
  }
});

module.exports = router;


router.patch('/cart', fetchuser, async (req, res) => {
    try {

        // Validate request body structure
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({ error: "Cart data is empty or malformed" });
        }

        const userId = req.user.id;
        const updates = req.body;

        for (const item of updates) {
            const { productId, title, size, quantity, price } = item;

            // Validate each required field for every item
            if (!productId || !title || !size || quantity == null || !price) {
                return res.status(400).json({ error: "Missing required fields in one or more cart items" });
            }

            try {
                // Check if the productId, size, and userId already exist in the cart
                const existingCartItem = await Cart.findOne({ userId, productId, size });
                if (existingCartItem) {
                    // If item exists, increment the quantity
                    existingCartItem.quantity += quantity;
                    await existingCartItem.save();
                } else {
                    // If item doesn't exist, create a new cart item
                    const newCartItem = new Cart({ userId, productId, title, size, quantity, price });
                    await newCartItem.save();
                }
            } catch (dbError) {
                return res.status(500).json({ error: "Database error while updating cart items" });
            }
        }

        return res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});




// delete from the cart

router.delete('/cart/:productId/:size',fetchuser, async (req, res) => {
    const { productId, size } = req.params;
    const userId = req.user.id; // assuming you're using JWT for user authentication
  
    try {
      const cartItem = await Cart.findOneAndDelete({
        userId: userId,
        productId: productId,
        size: size,
      });

  
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
