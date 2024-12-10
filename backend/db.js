const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const mongoURI = process.env.MONGO_URI;
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            socketTimeoutMS: 30000, // Increase timeout
            connectTimeoutMS: 30000 // Increase timeout
        });
        // console.log("Connected to MongoDB Atlas");
    } catch (error) {
        // console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
