const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if in-memory mode is enabled
    if (process.env.USE_MEMORY_DB === 'true') {
      console.log('🧠 Using in-memory database mode (no MongoDB required)');
      console.log('✅ In-memory database ready');
      return { connection: { host: 'in-memory', name: 'vehicle_rentals_memory' } };
    }

    // MongoDB connection options
    const options = {
      serverSelectionTimeoutMS: 10000, // Increased timeout
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      connectTimeoutMS: 10000,
    };

    // Primary connection URI (MongoDB Atlas)
    let mongoURI = process.env.MONGO_URI;

    // Fallback to local MongoDB if Atlas URI is not available or fails
    if (!mongoURI) {
      mongoURI = 'mongodb://localhost:27017/vehicle_rentals';
      console.log('No MONGO_URI found, using local MongoDB...');
    }

    console.log('Attempting to connect to MongoDB...');

    let conn;
    try {
      // Try primary connection
      conn = await mongoose.connect(mongoURI, options);
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      console.log(`📊 Database: ${conn.connection.name}`);
    } catch (atlasError) {
      console.log('❌ Atlas connection failed, trying local MongoDB...');
      console.log(`Atlas error: ${atlasError.message}`);

      // Try local MongoDB as fallback
      const localURI = 'mongodb://localhost:27017/vehicle_rentals';
      try {
        conn = await mongoose.connect(localURI, options);
        console.log(`✅ Local MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
      } catch (localError) {
        console.error('❌ Both Atlas and local MongoDB connections failed');
        console.error(`Local error: ${localError.message}`);

        // Offer in-memory fallback
        console.log('\n💡 Tip: Add USE_MEMORY_DB=true to your .env file to use in-memory mode for testing');
        throw new Error('Unable to connect to any MongoDB instance');
      }
    }

    // Handle connection events
    mongoose.connection.on('error', err => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

    // Handle process termination gracefully
    process.on('SIGINT', async () => {
      console.log('\n🔄 Gracefully shutting down...');
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed');
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n🔄 Gracefully shutting down...');
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed');
      process.exit(0);
    });

  } catch (err) {
    console.error(`❌ Error connecting to MongoDB: ${err.message}`);
    console.error('\n📋 Troubleshooting tips:');
    console.error('1. Check if MongoDB Atlas cluster is running');
    console.error('2. Verify your IP address is whitelisted in Atlas');
    console.error('3. Ensure your MongoDB Atlas credentials are correct');
    console.error('4. Try installing and running MongoDB locally');
    console.error('5. Check your internet connection');
    process.exit(1);
  }
};

module.exports = connectDB;