const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getMemoryDB } = require('../services/memoryDatabase');

// Database adapter to work with both MongoDB and memory database
const getDB = () => {
  if (process.env.USE_MEMORY_DB === 'true') {
    return getMemoryDB();
  }
  return null; // Use Mongoose models directly
};

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'No authentication token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = getDB();

    let user;
    if (db) {
      // Using memory database
      user = await db.getUserById(decoded.userId);
    } else {
      // Using MongoDB
      user = await User.findById(decoded.userId);
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Please authenticate' });
  }
};