const Testimonial = require('../models/Testimonial');
const { getMemoryDB } = require('../services/memoryDatabase');

// Database adapter to work with both MongoDB and memory database
const getDB = () => {
  if (process.env.USE_MEMORY_DB === 'true') {
    return getMemoryDB();
  }
  return null; // Use Mongoose models directly
};

// Get all testimonials (public - only approved and active)
exports.getAllTestimonials = async (req, res) => {
  try {
    const db = getDB();
    let testimonials;

    if (db) {
      // Using memory database - return empty array for now since we don't have testimonials in memory DB
      testimonials = [];
    } else {
      // Using MongoDB
      testimonials = await Testimonial.find({
        isApproved: true,
        isActive: true
      })
      .populate('vehicle', 'name make model')
      .sort({ createdAt: -1 });
    }

    res.json(testimonials);
  } catch (err) {
    console.error('Error in getAllTestimonials:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all testimonials for admin (including pending approval)
exports.getAllTestimonialsAdmin = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const testimonials = await Testimonial.find()
      .populate('vehicle', 'name make model')
      .populate('booking', 'startDate endDate')
      .sort({ createdAt: -1 });
    
    res.json(testimonials);
  } catch (err) {
    console.error('Error in getAllTestimonialsAdmin:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
      .populate('vehicle', 'name make model')
      .populate('booking', 'startDate endDate');
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (err) {
    console.error('Error in getTestimonialById:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create new testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    
    res.status(201).json(testimonial);
  } catch (err) {
    console.error('Error in createTestimonial:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (err) {
    console.error('Error in updateTestimonial:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error('Error in deleteTestimonial:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Approve testimonial
exports.approveTestimonial = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (err) {
    console.error('Error in approveTestimonial:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Toggle testimonial active status
exports.toggleTestimonialStatus = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    testimonial.isActive = !testimonial.isActive;
    await testimonial.save();
    
    res.json(testimonial);
  } catch (err) {
    console.error('Error in toggleTestimonialStatus:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get testimonials statistics for admin dashboard
exports.getTestimonialStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const stats = await Promise.all([
      Testimonial.countDocuments(),
      Testimonial.countDocuments({ isApproved: true }),
      Testimonial.countDocuments({ isApproved: false }),
      Testimonial.countDocuments({ isActive: true }),
      Testimonial.aggregate([
        { $group: { _id: null, avgRating: { $avg: '$rating' } } }
      ])
    ]);

    res.json({
      total: stats[0],
      approved: stats[1],
      pending: stats[2],
      active: stats[3],
      averageRating: stats[4][0]?.avgRating || 0
    });
  } catch (err) {
    console.error('Error in getTestimonialStats:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
