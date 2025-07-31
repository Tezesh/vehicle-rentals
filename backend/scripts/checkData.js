const { getMemoryDB } = require('../services/memoryDatabase');

async function checkCurrentData() {
  console.log('📊 Current Database State\n');

  const db = getMemoryDB();

  // Check users
  console.log('👥 USERS:');
  const users = await db.getAllUsers();
  users.forEach((user, index) => {
    console.log(`   ${index + 1}. ${user.name} (${user.email}) - Role: ${user.role} - ID: ${user._id}`);
  });

  // Check vehicles
  console.log('\n🚗 VEHICLES:');
  const vehicles = await db.getAllVehicles();
  vehicles.forEach((vehicle, index) => {
    console.log(`   ${index + 1}. ${vehicle.name} - $${vehicle.pricePerDay}/day - Status: ${vehicle.status} - Category: ${vehicle.category}`);
  });

  // Check bookings
  console.log('\n📅 BOOKINGS:');
  const bookings = await db.getAllBookings();
  if (bookings.length === 0) {
    console.log('   No bookings found');
  } else {
    bookings.forEach((booking, index) => {
      const user = users.find(u => u._id === booking.user);
      const vehicle = vehicles.find(v => v._id === booking.vehicle);
      console.log(`   ${index + 1}. User: ${user?.name || 'Unknown'} - Vehicle: ${vehicle?.name || 'Unknown'} - Price: $${booking.totalPrice} - Status: ${booking.status}`);
    });
  }

  console.log('\n📈 SUMMARY:');
  console.log(`   Total Users: ${users.length}`);
  console.log(`   Total Vehicles: ${vehicles.length}`);
  console.log(`   Total Bookings: ${bookings.length}`);
  console.log(`   Available Vehicles: ${vehicles.filter(v => v.status === 'available').length}`);
  console.log(`   Rented Vehicles: ${vehicles.filter(v => v.status === 'rented').length}`);
}

checkCurrentData().catch(console.error);
