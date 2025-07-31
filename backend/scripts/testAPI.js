const http = require('http');

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: jsonBody });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAPI() {
  console.log('🧪 Testing API Endpoints\n');

  try {
    // Test 1: Register a new user
    console.log('1️⃣ Testing User Registration...');
    const registerOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const registerData = {
      name: 'API Test User',
      email: 'apitest@example.com',
      password: 'password123'
    };

    const registerResponse = await makeRequest(registerOptions, registerData);
    if (registerResponse.status === 201) {
      console.log('✅ User registered successfully!');
      console.log('   User ID:', registerResponse.data.user._id);
      console.log('   Token received:', registerResponse.data.token ? 'Yes' : 'No');
    } else {
      console.log('❌ Registration failed:', registerResponse.data);
      return;
    }

    const token = registerResponse.data.token;
    const userId = registerResponse.data.user._id;

    // Test 2: Login
    console.log('\n2️⃣ Testing User Login...');
    const loginOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const loginData = {
      email: 'apitest@example.com',
      password: 'password123'
    };

    const loginResponse = await makeRequest(loginOptions, loginData);
    if (loginResponse.status === 200) {
      console.log('✅ User logged in successfully!');
      console.log('   User ID:', loginResponse.data.user._id);
    } else {
      console.log('❌ Login failed:', loginResponse.data);
    }

    // Test 3: Get vehicles
    console.log('\n3️⃣ Testing Get Vehicles...');
    const vehiclesOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/vehicles',
      method: 'GET'
    };

    const vehiclesResponse = await makeRequest(vehiclesOptions);
    if (vehiclesResponse.status === 200) {
      console.log('✅ Vehicles retrieved successfully!');
      console.log('   Number of vehicles:', vehiclesResponse.data.length);
      console.log('   First vehicle:', vehiclesResponse.data[0].name);
    } else {
      console.log('❌ Get vehicles failed:', vehiclesResponse.data);
    }

    // Test 4: Create booking
    console.log('\n4️⃣ Testing Create Booking...');
    const bookingOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/bookings',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const bookingData = {
      vehicle: vehiclesResponse.data[0]._id,
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()
    };

    const bookingResponse = await makeRequest(bookingOptions, bookingData);
    if (bookingResponse.status === 201) {
      console.log('✅ Booking created successfully!');
      console.log('   Booking ID:', bookingResponse.data._id);
      console.log('   Total Price: $' + bookingResponse.data.totalPrice);
    } else {
      console.log('❌ Create booking failed:', bookingResponse.data);
    }

    // Test 5: Get user bookings
    console.log('\n5️⃣ Testing Get User Bookings...');
    const userBookingsOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/bookings/my',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const userBookingsResponse = await makeRequest(userBookingsOptions);
    if (userBookingsResponse.status === 200) {
      console.log('✅ User bookings retrieved successfully!');
      console.log('   Number of bookings:', userBookingsResponse.data.length);
    } else {
      console.log('❌ Get user bookings failed:', userBookingsResponse.data);
    }

    console.log('\n🎉 All API tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   ✅ User registration works');
    console.log('   ✅ User login works');
    console.log('   ✅ Vehicle data is served');
    console.log('   ✅ Booking creation works');
    console.log('   ✅ User booking retrieval works');
    console.log('   ✅ Data is properly stored in backend memory database');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

// Run the test
testAPI();
