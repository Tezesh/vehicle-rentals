const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Protected routes
router.post('/', auth, bookingController.createBooking);
router.get('/my', auth, bookingController.getUserBookings);
router.get('/', auth, bookingController.getAllBookings);
router.put('/:id/status', auth, bookingController.updateBookingStatus);

module.exports = router; 