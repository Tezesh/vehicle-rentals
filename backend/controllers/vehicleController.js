const Vehicle = require('../models/Vehicle');
const { getMemoryDB } = require('../services/memoryDatabase');

// Helper function to get data source
const getDataSource = () => {
  return process.env.USE_MEMORY_DB === 'true' ? getMemoryDB() : null;
};

exports.getAllVehicles = async (req, res) => {
  try {
    const memoryDB = getDataSource();

    if (memoryDB) {
      // Use in-memory database
      const vehicles = await memoryDB.getAllVehicles();
      return res.json(vehicles);
    }

    // Use MongoDB
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    console.error('Error in getAllVehicles:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const memoryDB = getDataSource();

    if (memoryDB) {
      // Use in-memory database
      const vehicle = await memoryDB.getVehicleById(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
      return res.json(vehicle);
    }

    // Use MongoDB
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (err) {
    console.error('Error in getVehicleById:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createVehicle = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const memoryDB = getDataSource();

    if (memoryDB) {
      // Use in-memory database
      const vehicle = await memoryDB.createVehicle(req.body);
      return res.status(201).json(vehicle);
    }

    // Use MongoDB
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    console.error('Error in createVehicle:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const memoryDB = getDataSource();

    if (memoryDB) {
      // Use in-memory database
      const vehicle = await memoryDB.updateVehicle(req.params.id, req.body);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
      return res.json(vehicle);
    }

    // Use MongoDB
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json(vehicle);
  } catch (err) {
    console.error('Error in updateVehicle:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const memoryDB = getDataSource();

    if (memoryDB) {
      // Use in-memory database
      const deleted = await memoryDB.deleteVehicle(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
      return res.json({ message: 'Vehicle deleted successfully' });
    }

    // Use MongoDB
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    console.error('Error in deleteVehicle:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Health check endpoint
exports.healthCheck = async (req, res) => {
  try {
    const memoryDB = getDataSource();

    if (memoryDB) {
      return res.json({
        status: 'healthy',
        database: 'in-memory',
        connected: memoryDB.isConnected(),
        vehicleCount: (await memoryDB.getAllVehicles()).length,
        timestamp: new Date().toISOString()
      });
    }

    // Check MongoDB connection
    const vehicleCount = await Vehicle.countDocuments();
    res.json({
      status: 'healthy',
      database: 'mongodb',
      connected: true,
      vehicleCount,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Health check error:', err);
    res.status(500).json({
      status: 'unhealthy',
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
};