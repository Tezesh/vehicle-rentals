const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  pricePerHour: { type: Number },
  description: { type: String },
  image: { type: String },
  availability: { type: Boolean, default: true },
  status: { type: String, enum: ['available', 'rented', 'maintenance'], default: 'available' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vehicle', vehicleSchema); 