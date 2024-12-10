const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Mongoose will automatically create an index for this
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create the User model
const User = mongoose.model("User", UserSchema);

// No explicit index creation needed
module.exports = User;
