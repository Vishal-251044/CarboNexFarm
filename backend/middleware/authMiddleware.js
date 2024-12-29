const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const JWT_SECRET = process.env.JWT_SECRET;

exports.authMiddleware = (req, res, next) => {
  // Get the token from request header
  const token = req.header('x-auth-token');

  // If token doesn't exist, return 401 unauthorized
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token using JWT_SECRET
    req.user = decoded; // Assign decoded token to req.user
    next(); // Move to the next middleware
  } catch (error) {
    // If token is invalid, return 401 unauthorized
    res.status(401).json({ message: 'Token is not valid' });
  }
};
