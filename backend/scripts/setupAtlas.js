const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const testAtlasConnection = async () => {
  console.log('🔍 Testing MongoDB Atlas Connection...\n');
  
  const mongoURI = process.env.MONGO_URI;
  
  if (!mongoURI) {
    console.error('❌ No MONGO_URI found in .env file');
    process.exit(1);
  }
  
  console.log('📋 Connection Details:');
  console.log(`URI: ${mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`);
  
  try {
    console.log('\n⏳ Attempting to connect...');
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    console.log(`📡 Port: ${conn.connection.port}`);
    
    // Test basic operations
    console.log('\n🧪 Testing database operations...');
    
    // List collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`📁 Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('   Collections:', collections.map(c => c.name).join(', '));
    }
    
    // Test write operation
    const testCollection = conn.connection.db.collection('connection_test');
    const testDoc = {
      message: 'Atlas connection test',
      timestamp: new Date(),
      success: true
    };
    
    await testCollection.insertOne(testDoc);
    console.log('✅ Write test successful');
    
    // Test read operation
    const readResult = await testCollection.findOne({ success: true });
    if (readResult) {
      console.log('✅ Read test successful');
    }
    
    // Clean up test document
    await testCollection.deleteOne({ _id: testDoc._id });
    console.log('✅ Cleanup successful');
    
    console.log('\n🎉 MongoDB Atlas is fully functional!');
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm run seed (to populate with sample data)');
    console.log('2. Run: npm start (to start the server)');
    console.log('3. Test API: http://localhost:5000/api/vehicles/health');
    
  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error(`Error: ${error.message}`);
    
    console.log('\n🔧 Troubleshooting Guide:');
    
    if (error.message.includes('IP')) {
      console.log('\n🌐 IP Whitelist Issue:');
      console.log('1. Go to https://cloud.mongodb.com/');
      console.log('2. Select your project and cluster');
      console.log('3. Go to "Network Access" in the left sidebar');
      console.log('4. Click "Add IP Address"');
      console.log('5. Choose "Add Current IP Address" or "Allow Access from Anywhere" (0.0.0.0/0)');
      console.log('6. Save and wait 1-2 minutes for changes to take effect');
    }
    
    if (error.message.includes('authentication')) {
      console.log('\n🔐 Authentication Issue:');
      console.log('1. Check your username and password in the connection string');
      console.log('2. Go to "Database Access" in MongoDB Atlas');
      console.log('3. Verify user exists and has correct permissions');
      console.log('4. Reset password if needed');
    }
    
    if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
      console.log('\n🌐 Network Issue:');
      console.log('1. Check your internet connection');
      console.log('2. Try disabling VPN if you\'re using one');
      console.log('3. Check if your firewall is blocking the connection');
      console.log('4. Try connecting from a different network');
    }
    
    console.log('\n💡 Quick Fixes:');
    console.log('• Add 0.0.0.0/0 to IP whitelist (allows all IPs)');
    console.log('• Verify cluster is not paused in Atlas dashboard');
    console.log('• Check if you have sufficient Atlas credits/quota');
    
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

// Get current IP address
const getCurrentIP = async () => {
  try {
    const https = require('https');
    return new Promise((resolve, reject) => {
      https.get('https://api.ipify.org?format=json', (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const ip = JSON.parse(data).ip;
            resolve(ip);
          } catch (e) {
            reject(e);
          }
        });
      }).on('error', reject);
    });
  } catch (error) {
    return 'Unable to detect';
  }
};

const main = async () => {
  console.log('🚀 MongoDB Atlas Setup & Test Tool\n');
  
  // Show current IP
  try {
    const currentIP = await getCurrentIP();
    console.log(`🌐 Your current IP address: ${currentIP}`);
    console.log('   Make sure this IP is whitelisted in MongoDB Atlas\n');
  } catch (error) {
    console.log('🌐 Could not detect current IP address\n');
  }
  
  await testAtlasConnection();
};

if (require.main === module) {
  main();
}

module.exports = { testAtlasConnection };
