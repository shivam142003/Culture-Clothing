var jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../.env' });

const jwt_s = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    // Get user from JWT token in the header
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    try {
        const data = jwt.verify(token, jwt_s);
        req.user = data.user;  // Attach user data to req.user
        next();  // Proceed to the next middleware/route handler
    } catch (err) {
        return res.status(401).json({ error: "Invalid token. Please authenticate using a valid token." });
    }
};

module.exports = fetchuser;
