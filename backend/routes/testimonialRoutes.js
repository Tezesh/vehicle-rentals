const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);
router.post('/', testimonialController.createTestimonial);

// Admin routes (protected)
router.get('/admin/all', auth, testimonialController.getAllTestimonialsAdmin);
router.get('/admin/stats', auth, testimonialController.getTestimonialStats);
router.put('/:id', auth, testimonialController.updateTestimonial);
router.delete('/:id', auth, testimonialController.deleteTestimonial);
router.put('/:id/approve', auth, testimonialController.approveTestimonial);
router.put('/:id/toggle-status', auth, testimonialController.toggleTestimonialStatus);

module.exports = router;
