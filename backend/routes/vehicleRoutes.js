const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const auth = require('../middleware/auth');

// Health check endpoint (no auth required)
router.get('/health', vehicleController.healthCheck);

// Vehicle CRUD endpoints
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);
router.post('/', auth, vehicleController.createVehicle);
router.put('/:id', auth, vehicleController.updateVehicle);
router.delete('/:id', auth, vehicleController.deleteVehicle);

module.exports = router; 