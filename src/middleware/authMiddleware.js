// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

const jwtSecretKey = config.encryption.jwt.secretkey;

const authMiddleware = (req, res, next) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers['authorization'];


    if (!authHeader) {
        return res.errorKey('TOKEN_INVALID').error();
    }

    // Ensure the token is a Bearer token
    const token = authHeader.split('Bearer ')[1];

    if (!token) {
        return res.errorKey('TOKEN_INVALID').error();
    }

    // Verify the token
    const decoded = jwt.verify(token, jwtSecretKey);

    // Attach the user information to the request
    req.user = decoded;
    
    if (req.user.ban === true) { 
        return res.errorKey('ACCOUNT_DISABLED').error();
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Authorization error:', err);
    return res.errorKey('TOKEN_INVALID').error();
  }
};

module.exports = authMiddleware;
