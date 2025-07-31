const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', auth, userController.getProfile);

// Admin routes for user management
router.get('/', auth, userController.getAllUsers);
router.get('/stats', auth, userController.getUserStats);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;