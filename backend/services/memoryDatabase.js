// In-memory database for testing without MongoDB
class MemoryDatabase {
  constructor() {
    this.vehicles = [
      {
        _id: '1',
        name: 'Mercedes-Benz S-Class',
        category: 'luxury',
        type: 'Car',
        description: 'Premium luxury sedan with massage seats, advanced tech, and unparalleled comfort. Perfect for business and special occasions.',
        pricePerDay: 299,
        year: 2024,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Massage Seats', 'Burmester Sound System', 'MBUX Infotainment', 'Active Body Control', 'Night Vision'],
        specifications: {
          engine: '3.0L V6 Turbo + EQBoost',
          transmission: '9G-TRONIC Automatic',
          fuelType: 'Hybrid',
          seats: 5,
          doors: 4
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        name: 'BMW M4 Competition',
        category: 'sports',
        type: 'Car',
        description: 'High-performance coupe with 503 HP, M xDrive AWD, and carbon fiber components. Built for ultimate driving excitement.',
        pricePerDay: 449,
        year: 2024,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['M xDrive AWD', 'Carbon Fiber Roof', 'M Track Package', 'Harman Kardon Audio', 'Launch Control'],
        specifications: {
          engine: '3.0L Twin-Turbo I6 S58',
          transmission: '8-Speed M Steptronic',
          fuelType: 'Gasoline',
          seats: 4,
          doors: 2
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: '3',
        name: 'Range Rover Evoque',
        category: 'suv',
        type: 'Car',
        description: 'Compact luxury SUV with distinctive design, advanced off-road capability, and premium Meridian sound system.',
        pricePerDay: 279,
        year: 2024,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Terrain Response 2', 'ClearSight Rear View', 'Meridian Audio', 'Panoramic Roof', 'Wade Sensing'],
        specifications: {
          engine: '2.0L Turbo I4',
          transmission: 'Automatic',
          fuelType: 'Gasoline',
          seats: 5
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: '4',
        name: 'Tesla Model S Plaid',
        category: 'luxury',
        type: 'Car',
        description: 'Electric performance flagship with tri-motor AWD, 0-60 in under 2 seconds, and 400+ mile range. Advanced autopilot included.',
        pricePerDay: 399,
        year: 2024,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Full Self-Driving', 'Supercharging Network', '17" Touchscreen', 'Premium Audio', 'Bioweapon Defense Mode'],
        specifications: {
          engine: 'Tri-Motor Electric (1020 HP)',
          transmission: 'Single Speed',
          fuelType: 'Electric',
          seats: 5,
          doors: 4
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: '5',
        name: 'Audi A4 Sedan',
        category: 'sedan',
        type: 'Car',
        description: 'Elegant sedan offering perfect balance of luxury and practicality with Quattro AWD.',
        pricePerDay: 179,
        year: 2023,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        features: ['Quattro AWD', 'Virtual Cockpit', 'Premium Sound', 'Heated Seats'],
        specifications: {
          engine: '2.0L Turbo I4',
          transmission: 'Automatic',
          fuelType: 'Gasoline',
          seats: 5
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: '6',
        name: 'Porsche 911 Carrera',
        category: 'sports',
        type: 'Car',
        description: 'Iconic sports car defining performance with pure driving pleasure and legendary handling.',
        pricePerDay: 499,
        year: 2023,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        features: ['Sport Chrono Package', 'PASM', 'Sport Exhaust', 'Racing Seats'],
        specifications: {
          engine: '3.0L Twin-Turbo Flat-6',
          transmission: 'PDK Automatic',
          fuelType: 'Gasoline',
          seats: 2
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: '7',
        name: 'Harley-Davidson Street 750',
        category: 'bike',
        type: 'Bike',
        description: 'Modern cruiser combining classic American styling with contemporary performance. Perfect for city and highway riding.',
        pricePerDay: 129,
        year: 2024,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Revolution X Engine', 'ABS Braking', 'LED Lighting', 'Low Seat Height', 'Michelin Tires'],
        specifications: {
          engine: '749cc Liquid-Cooled V-Twin',
          transmission: '6-Speed Manual',
          fuelType: 'Gasoline',
          seats: 2,
          topSpeed: '185 km/h'
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: '8',
        name: 'Yamaha YZF-R1M',
        category: 'bike',
        type: 'Bike',
        description: 'Yamaha\'s flagship superbike with MotoGP-derived electronics, Öhlins suspension, and carbon fiber bodywork. Track-focused performance.',
        pricePerDay: 199,
        year: 2024,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Crossplane Crankshaft', 'Öhlins Suspension', 'Carbon Fiber Bodywork', 'Launch Control', 'Slide Control'],
        specifications: {
          engine: '998cc Crossplane Inline-4',
          transmission: '6-Speed with Quick Shifter',
          fuelType: 'Gasoline',
          seats: 2,
          topSpeed: '299 km/h'
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: '9',
        name: 'Honda CBR600RR',
        category: 'bike',
        type: 'Bike',
        description: 'Reliable sports bike with excellent handling, fuel efficiency, and VTEC performance.',
        pricePerDay: 99,
        year: 2023,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['VTEC Engine', 'C-ABS', 'Dual Stage Fuel Injection', 'Lightweight Frame'],
        specifications: {
          engine: '599cc Inline-4',
          transmission: '6-Speed',
          fuelType: 'Gasoline',
          seats: 2
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: '10',
        name: 'Ducati Panigale V4',
        category: 'bike',
        type: 'Bike',
        description: 'Italian superbike engineering at its finest with Desmosedici Stradale V4 power and race-bred technology.',
        pricePerDay: 199,
        year: 2023,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Desmosedici Stradale Engine', 'Cornering ABS', 'Wheelie Control', 'Race Mode'],
        specifications: {
          engine: '1103cc V4',
          transmission: '6-Speed',
          fuelType: 'Gasoline',
          seats: 2
        },
        createdAt: new Date().toISOString()
      }
    ];

    this.users = [
      {
        _id: 'user1',
        name: 'Admin User',
        email: 'admin@enjoydrive.com',
        password: '$2a$12$fQHch/XWJqopnv9WdQPJDeSQGUtkdqO8vk3WXwk4xPkDSUFaqDq5y', // admin123
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'user2',
        name: 'John Doe',
        email: 'john@example.com',
        password: '$2a$12$fQHch/XWJqopnv9WdQPJDeSQGUtkdqO8vk3WXwk4xPkDSUFaqDq5y', // user123 (using same hash for simplicity)
        role: 'user',
        createdAt: new Date().toISOString()
      }
    ];

    this.bookings = [];
    this.nextId = 7; // For generating new IDs
  }

  // Vehicle methods
  getAllVehicles() {
    return Promise.resolve(this.vehicles);
  }

  getVehicleById(id) {
    const vehicle = this.vehicles.find(v => v._id === id);
    return Promise.resolve(vehicle || null);
  }

  getVehiclesByCategory(category) {
    const vehicles = this.vehicles.filter(v => v.category.toLowerCase() === category.toLowerCase());
    return Promise.resolve(vehicles);
  }

  createVehicle(vehicleData) {
    const newVehicle = {
      _id: this.nextId.toString(),
      ...vehicleData,
      createdAt: new Date().toISOString()
    };
    this.vehicles.push(newVehicle);
    this.nextId++;
    return Promise.resolve(newVehicle);
  }

  updateVehicle(id, updateData) {
    const index = this.vehicles.findIndex(v => v._id === id);
    if (index === -1) return Promise.resolve(null);
    
    this.vehicles[index] = { ...this.vehicles[index], ...updateData };
    return Promise.resolve(this.vehicles[index]);
  }

  deleteVehicle(id) {
    const index = this.vehicles.findIndex(v => v._id === id);
    if (index === -1) return Promise.resolve(false);
    
    this.vehicles.splice(index, 1);
    return Promise.resolve(true);
  }

  // User methods
  getAllUsers() {
    return Promise.resolve(this.users);
  }

  getUserById(id) {
    const user = this.users.find(u => u._id === id);
    return Promise.resolve(user || null);
  }

  getUserByEmail(email) {
    const user = this.users.find(u => u.email === email);
    return Promise.resolve(user || null);
  }

  createUser(userData) {
    const newUser = {
      _id: `user${this.nextId}`,
      ...userData,
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    this.nextId++;
    return Promise.resolve(newUser);
  }

  // Booking methods
  getAllBookings() {
    return Promise.resolve(this.bookings);
  }

  getBookingById(id) {
    const booking = this.bookings.find(b => b._id === id);
    return Promise.resolve(booking || null);
  }

  createBooking(bookingData) {
    const newBooking = {
      _id: `booking${this.nextId}`,
      ...bookingData,
      createdAt: new Date().toISOString()
    };
    this.bookings.push(newBooking);
    this.nextId++;
    return Promise.resolve(newBooking);
  }

  updateBooking(id, updateData) {
    const index = this.bookings.findIndex(b => b._id === id);
    if (index === -1) return Promise.resolve(null);

    this.bookings[index] = { ...this.bookings[index], ...updateData };
    return Promise.resolve(this.bookings[index]);
  }

  getUserBookings(userId) {
    const userBookings = this.bookings.filter(b => b.user === userId);
    return Promise.resolve(userBookings);
  }

  deleteBooking(id) {
    const index = this.bookings.findIndex(b => b._id === id);
    if (index === -1) return Promise.resolve(false);

    this.bookings.splice(index, 1);
    return Promise.resolve(true);
  }

  // Health check
  isConnected() {
    return true;
  }
}

// Singleton instance
let memoryDB = null;

const getMemoryDB = () => {
  if (!memoryDB) {
    memoryDB = new MemoryDatabase();
  }
  return memoryDB;
};

module.exports = { MemoryDatabase, getMemoryDB };
