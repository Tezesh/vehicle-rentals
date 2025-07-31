const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testUserRegistrationAndBooking() {
  console.log('🧪 Testing User Registration and Booking System\n');

  try {
    // Test 1: Register a new user
    console.log('1️⃣ Testing User Registration...');
    const registerData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123'
    };

    const registerResponse = await axios.post(`${BASE_URL}/users/register`, registerData);
    console.log('✅ User registered successfully!');
    console.log('User ID:', registerResponse.data.user._id);
    console.log('Token received:', registerResponse.data.token ? 'Yes' : 'No');

    const token = registerResponse.data.token;
    const userId = registerResponse.data.user._id;

    // Test 2: Login with the same user
    console.log('\n2️⃣ Testing User Login...');
    const loginData = {
      email: 'testuser@example.com',
      password: 'password123'
    };

    const loginResponse = await axios.post(`${BASE_URL}/users/login`, loginData);
    console.log('✅ User logged in successfully!');
    console.log('User ID:', loginResponse.data.user._id);

    // Test 3: Get user profile
    console.log('\n3️⃣ Testing Get User Profile...');
    const profileResponse = await axios.get(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ User profile retrieved successfully!');
    console.log('Profile:', profileResponse.data);

    // Test 4: Get all vehicles
    console.log('\n4️⃣ Testing Get Vehicles...');
    const vehiclesResponse = await axios.get(`${BASE_URL}/vehicles`);
    console.log('✅ Vehicles retrieved successfully!');
    console.log('Number of vehicles:', vehiclesResponse.data.length);
    
    const firstVehicle = vehiclesResponse.data[0];
    console.log('First vehicle:', firstVehicle.name, '- $' + firstVehicle.pricePerDay + '/day');

    // Test 5: Create a booking
    console.log('\n5️⃣ Testing Create Booking...');
    const bookingData = {
      vehicle: firstVehicle._id,
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()  // 3 days from now
    };

    const bookingResponse = await axios.post(`${BASE_URL}/bookings`, bookingData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Booking created successfully!');
    console.log('Booking ID:', bookingResponse.data._id);
    console.log('Total Price:', '$' + bookingResponse.data.totalPrice);

    // Test 6: Get user bookings
    console.log('\n6️⃣ Testing Get User Bookings...');
    const userBookingsResponse = await axios.get(`${BASE_URL}/bookings/my`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ User bookings retrieved successfully!');
    console.log('Number of bookings:', userBookingsResponse.data.length);

    // Test 7: Login as admin and get all bookings
    console.log('\n7️⃣ Testing Admin Login and Get All Bookings...');
    const adminLoginData = {
      email: 'admin@enjoydrive.com',
      password: 'admin123'
    };

    const adminLoginResponse = await axios.post(`${BASE_URL}/users/login`, adminLoginData);
    console.log('✅ Admin logged in successfully!');
    
    const adminToken = adminLoginResponse.data.token;

    const allBookingsResponse = await axios.get(`${BASE_URL}/bookings`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ All bookings retrieved successfully!');
    console.log('Total bookings in system:', allBookingsResponse.data.length);

    console.log('\n🎉 All tests passed! User registration and booking system is working correctly.');

  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data?.message || error.message);
    if (error.response?.data) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testUserRegistrationAndBooking();
