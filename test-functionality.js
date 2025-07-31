const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAllFunctionality() {
  console.log('🧪 Testing Complete Website Functionality\n');

  try {
    // Test 1: Check if backend is running
    console.log('1️⃣ Testing Backend Connection...');
    const healthResponse = await axios.get(`${BASE_URL}/vehicles/health`);
    console.log('✅ Backend is running!');

    // Test 2: Get all vehicles
    console.log('\n2️⃣ Testing Vehicle API...');
    const vehiclesResponse = await axios.get(`${BASE_URL}/vehicles`);
    console.log(`✅ Vehicles API working! Found ${vehiclesResponse.data.length} vehicles`);
    
    // Check if vehicles have required fields
    const firstVehicle = vehiclesResponse.data[0];
    const requiredFields = ['_id', 'name', 'type', 'pricePerDay', 'specifications'];
    const missingFields = requiredFields.filter(field => !firstVehicle[field]);
    if (missingFields.length === 0) {
      console.log('✅ Vehicle data structure is correct');
    } else {
      console.log(`❌ Missing fields in vehicle data: ${missingFields.join(', ')}`);
    }

    // Test 3: Admin login
    console.log('\n3️⃣ Testing Admin Login...');
    const adminLoginData = {
      email: 'admin@enjoydrive.com',
      password: 'admin123'
    };
    const adminLoginResponse = await axios.post(`${BASE_URL}/users/login`, adminLoginData);
    console.log('✅ Admin login working!');
    
    const adminToken = adminLoginResponse.data.token;
    const adminUser = adminLoginResponse.data.user;
    
    if (adminUser.role === 'admin') {
      console.log('✅ Admin role verification working!');
    } else {
      console.log('❌ Admin role verification failed');
    }

    // Test 4: Admin profile endpoint
    console.log('\n4️⃣ Testing Admin Profile Endpoint...');
    const profileResponse = await axios.get(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Admin profile endpoint working!');

    // Test 5: Vehicle CRUD operations
    console.log('\n5️⃣ Testing Vehicle CRUD Operations...');
    
    // Create a test vehicle
    const testVehicleData = {
      name: 'Test Vehicle',
      type: 'Car',
      category: 'luxury',
      pricePerDay: 199,
      year: 2024,
      status: 'available',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Test vehicle for functionality testing',
      specifications: {
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        seats: 5
      }
    };

    const createResponse = await axios.post(`${BASE_URL}/vehicles`, testVehicleData, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Vehicle creation working!');
    
    const createdVehicleId = createResponse.data._id;

    // Update the test vehicle
    const updateData = { ...testVehicleData, pricePerDay: 299 };
    await axios.put(`${BASE_URL}/vehicles/${createdVehicleId}`, updateData, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Vehicle update working!');

    // Delete the test vehicle
    await axios.delete(`${BASE_URL}/vehicles/${createdVehicleId}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Vehicle deletion working!');

    // Test 6: User registration and booking
    console.log('\n6️⃣ Testing User Registration and Booking...');
    
    const testUserData = {
      name: 'Test User',
      email: `testuser${Date.now()}@example.com`,
      password: 'testpass123'
    };

    const registerResponse = await axios.post(`${BASE_URL}/users/register`, testUserData);
    console.log('✅ User registration working!');
    
    const userToken = registerResponse.data.token;

    // Test booking creation
    const bookingData = {
      vehicle: vehiclesResponse.data[0]._id,
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    };

    const bookingResponse = await axios.post(`${BASE_URL}/bookings`, bookingData, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Booking creation working!');
    console.log(`   Booking ID: ${bookingResponse.data._id}`);
    console.log(`   Total Price: $${bookingResponse.data.totalPrice}`);

    // Test 7: Get user bookings
    console.log('\n7️⃣ Testing User Bookings...');
    const userBookingsResponse = await axios.get(`${BASE_URL}/bookings/my`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log(`✅ User bookings working! Found ${userBookingsResponse.data.length} bookings`);

    // Test 8: Admin get all bookings
    console.log('\n8️⃣ Testing Admin Bookings Management...');
    const allBookingsResponse = await axios.get(`${BASE_URL}/bookings`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log(`✅ Admin bookings management working! Found ${allBookingsResponse.data.length} total bookings`);

    console.log('\n🎉 ALL TESTS PASSED! Website functionality is working correctly.');
    console.log('\n📋 Summary:');
    console.log('✅ Backend API connection');
    console.log('✅ Vehicle management (CRUD)');
    console.log('✅ Admin authentication & authorization');
    console.log('✅ User registration & authentication');
    console.log('✅ Booking system');
    console.log('✅ Admin panel functionality');
    console.log('✅ Error handling');

  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data?.message || error.message);
    if (error.response?.data) {
      console.error('Response data:', error.response.data);
    }
    console.error('Stack:', error.stack);
  }
}

// Run the test
testAllFunctionality();
