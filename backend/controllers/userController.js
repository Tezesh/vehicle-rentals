const bcrypt = require('bcryptjs');
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

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const db = getDB();

    let existingUser;
    if (db) {
      // Using memory database
      existingUser = await db.getUserByEmail(email);
    } else {
      // Using MongoDB
      existingUser = await User.findOne({ email });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user;
    if (db) {
      // Using memory database
      user = await db.createUser({
        name,
        email,
        password: hashedPassword,
        role: 'user'
      });
    } else {
      // Using MongoDB
      user = new User({
        name,
        email,
        password: hashedPassword
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDB();

    let user;
    if (db) {
      // Using memory database
      user = await db.getUserByEmail(email);
    } else {
      // Using MongoDB
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const db = getDB();
    let user;

    if (db) {
      // Using memory database
      user = await db.getUserById(req.user._id);
      if (user) {
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        user = userWithoutPassword;
      }
    } else {
      // Using MongoDB
      user = await User.findById(req.user._id).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const db = getDB();
    let users;

    if (db) {
      // Using memory database - filter out admin users
      const allUsers = await db.getAllUsers();
      const regularUsers = allUsers.filter(user => user.role !== 'admin');
      users = regularUsers.map(user => {
        const { password, ...userWithoutPassword } = user;
        return {
          ...userWithoutPassword,
          id: user._id, // Add id field for frontend compatibility
          username: user.name, // Map name to username for frontend
          createdAt: new Date(user.createdAt).toLocaleDateString()
        };
      });
    } else {
      // Using MongoDB - filter out admin users
      const allUsers = await User.find({ role: { $ne: 'admin' } }).select('-password');
      users = allUsers.map(user => ({
        ...user.toObject(),
        id: user._id,
        username: user.name,
        createdAt: user.createdAt.toLocaleDateString()
      }));
    }

    res.json(users);
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Get user statistics
exports.getUserStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const db = getDB();
    let totalUsers, adminUsers, regularUsers;

    if (db) {
      // Using memory database
      const allUsers = await db.getAllUsers();
      totalUsers = allUsers.length;
      adminUsers = allUsers.filter(user => user.role === 'admin').length;
      regularUsers = allUsers.filter(user => user.role === 'user' || user.role === 'customer').length;
    } else {
      // Using MongoDB
      totalUsers = await User.countDocuments();
      adminUsers = await User.countDocuments({ role: 'admin' });
      regularUsers = await User.countDocuments({ role: { $in: ['user', 'customer'] } });
    }

    res.json({
      totalUsers,
      adminUsers,
      regularUsers
    });
  } catch (err) {
    console.error('Get user stats error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Delete user
exports.deleteUser = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const userId = req.params.id;

    // Prevent admin from deleting themselves
    if (userId === req.user._id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const db = getDB();
    let success = false;

    if (db) {
      // Using memory database
      const userIndex = db.users.findIndex(user => user._id === userId);
      if (userIndex !== -1) {
        db.users.splice(userIndex, 1);
        success = true;
      }
    } else {
      // Using MongoDB
      const deletedUser = await User.findByIdAndDelete(userId);
      success = !!deletedUser;
    }

    if (!success) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};