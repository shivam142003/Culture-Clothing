const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User', // Assuming your User model is named 'User'
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    title: {
        type: String
    },
    size: {
        type: String,
        required:true
    },
    quantity: {
        type: Number,
        required:true
    },
    price: {
        type: String,
        required:true
    }
});

CartSchema.index({ userId: 1, productId: 1, size: 1 }, { unique: true });

module.exports = mongoose.model('Cart', CartSchema);