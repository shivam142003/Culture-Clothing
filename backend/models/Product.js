// models/Product.js
const mongoose = require('mongoose');
const Counter = require('./Counter');

const productSchema = new mongoose.Schema({
  productId: { type: Number,unique: true },
  title: { type: String, required: true },
  images: [{ type: String }], // Store image URLs or paths
  price: { type: String, required: true },
  description: { type: String },
  care: [{ type: String }],
  composition: [{ type: String }],
  shipping: [{ type: String }],
  trending: { type: Boolean, default: false },
  discount:{type:Number,default:0},
});

productSchema.index({ productId: 1 }, { unique: true });

// Pre-save hook to automatically assign productId
productSchema.pre('save', async function (next) {
  const product = this;

  if (product.isNew) {
    try {
      // Fetch the counter for productId
      const counter = await Counter.findOneAndUpdate(
        { name: 'productId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      product.productId = counter.seq; // Assign the next productId
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
