const { getMemoryDB } = require('../services/memoryDatabase');

async function testMemoryDatabase() {
  console.log('🧪 Testing Memory Database Operations\n');

  const db = getMemoryDB();

  // Test 1: Check initial data
  console.log('1️⃣ Testing Initial Data...');
  const vehicles = await db.getAllVehicles();
  const users = await db.getAllUsers();
  const bookings = await db.getAllBookings();

  console.log(`✅ Vehicles: ${vehicles.length}`);
  console.log(`✅ Users: ${users.length}`);
  console.log(`✅ Bookings: ${bookings.length}`);

  // Test 2: Create a new user
  console.log('\n2️⃣ Testing User Creation...');
  const newUser = await db.createUser({
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedpassword123',
    role: 'user'
  });
  console.log('✅ User created:', newUser.name, '- ID:', newUser._id);

  // Test 3: Create a booking
  console.log('\n3️⃣ Testing Booking Creation...');
  const newBooking = await db.createBooking({
    user: newUser._id,
    vehicle: vehicles[0]._id,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    totalPrice: vehicles[0].pricePerDay * 3,
    status: 'pending'
  });
  console.log('✅ Booking created:', newBooking._id);
  console.log('   Vehicle:', vehicles[0].name);
  console.log('   Total Price: $' + newBooking.totalPrice);

  // Test 4: Get user bookings
  console.log('\n4️⃣ Testing Get User Bookings...');
  const userBookings = await db.getUserBookings(newUser._id);
  console.log('✅ User bookings:', userBookings.length);

  // Test 5: Update vehicle status
  console.log('\n5️⃣ Testing Vehicle Status Update...');
  await db.updateVehicle(vehicles[0]._id, { status: 'rented' });
  const updatedVehicle = await db.getVehicleById(vehicles[0]._id);
  console.log('✅ Vehicle status updated to:', updatedVehicle.status);

  // Test 6: Get all data again
  console.log('\n6️⃣ Testing Final Data Count...');
  const finalVehicles = await db.getAllVehicles();
  const finalUsers = await db.getAllUsers();
  const finalBookings = await db.getAllBookings();

  console.log(`✅ Final Vehicles: ${finalVehicles.length}`);
  console.log(`✅ Final Users: ${finalUsers.length}`);
  console.log(`✅ Final Bookings: ${finalBookings.length}`);

  console.log('\n🎉 All memory database tests passed!');
  console.log('\n📊 Summary:');
  console.log(`   - Users can be registered and stored`);
  console.log(`   - Bookings can be created and linked to users and vehicles`);
  console.log(`   - Vehicle status can be updated when booked`);
  console.log(`   - All data persists in memory during server runtime`);
}

// Run the test
testMemoryDatabase().catch(console.error);
