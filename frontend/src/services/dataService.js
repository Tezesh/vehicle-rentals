// Centralized data service to ensure consistency across all components
class DataService {
  constructor() {
    // Initialize data from localStorage or use defaults
    this.loadData();
  }

  loadData() {
    // Load vehicles
    const savedVehicles = localStorage.getItem('vehicles');
    this.vehicles = savedVehicles ? JSON.parse(savedVehicles) : [
      {
        _id: '1',
        id: 1,
        name: 'Yamaha R15 V4',
        category: 'bike',
        type: 'Bike',
        description: 'Experience the thrill of riding with our sporty Yamaha R15 V4.',
        pricePerDay: 99,
        price: 99,
        year: 2024,
        status: 'available',
        fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Digital Display', 'LED Headlight', 'ABS', 'Sporty Design'],
        specifications: {
          engine: '155cc Single Cylinder',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol',
          seats: 2,
          topSpeed: '136 km/h'
        }
      },
      {
        _id: '2',
        id: 2,
        name: 'KTM Duke 390',
        category: 'bike',
        type: 'Bike',
        description: 'Feel the power and agility of our KTM Duke 390.',
        pricePerDay: 129,
        price: 129,
        year: 2024,
        status: 'available',
        fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['TFT Display', 'Ride by Wire', 'ABS', 'Slipper Clutch'],
        specifications: {
          engine: '373cc Single Cylinder',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol',
          seats: 2,
          topSpeed: '167 km/h'
        }
      },
      {
        _id: '3',
        id: 3,
        name: 'Royal Enfield Classic 350',
        category: 'bike',
        type: 'Bike',
        description: 'Cruise in style with our classic Royal Enfield Classic 350.',
        pricePerDay: 79,
        price: 79,
        year: 2023,
        status: 'available',
        fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Classic Design', 'Chrome Finish', 'Comfortable Seating', 'Retro Style'],
        specifications: {
          engine: '349cc Single Cylinder',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol',
          seats: 2,
          topSpeed: '114 km/h'
        }
      },
      {
        _id: '4',
        id: 4,
        name: 'Honda CBR 650R',
        category: 'bike',
        type: 'Bike',
        description: 'Experience premium performance with our Honda CBR 650R.',
        pricePerDay: 199,
        price: 199,
        year: 2024,
        status: 'rented',
        fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Full Fairing', 'LED Lighting', 'Digital Display', 'Sport Mode'],
        specifications: {
          engine: '649cc Inline-4',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol',
          seats: 2,
          topSpeed: '200 km/h'
        }
      },
      {
        _id: '5',
        id: 5,
        name: 'BMW M4 Coupe',
        category: 'sports',
        type: 'Car',
        description: 'Feel the thrill of driving with our high-performance BMW M4 Coupe.',
        pricePerDay: 399,
        price: 399,
        year: 2023,
        status: 'available',
        fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        features: ['Sport Seats', 'Performance Brakes', 'Track Mode', 'Premium Audio'],
        specifications: {
          engine: '3.0L Twin-Turbo I6',
          transmission: 'Automatic',
          fuelType: 'Petrol',
          seats: 4,
          doors: 2
        }
      },
      {
        _id: '6',
        id: 6,
        name: 'Mercedes-Benz S-Class',
        category: 'luxury',
        type: 'Car',
        description: 'Experience ultimate luxury with our premium Mercedes-Benz S-Class.',
        pricePerDay: 299,
        price: 299,
        year: 2023,
        status: 'available',
        fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        features: ['Leather Interior', 'GPS Navigation', 'Bluetooth', 'Premium Sound System'],
        specifications: {
          engine: '3.0L V6 Turbo',
          transmission: 'Automatic',
          fuelType: 'Petrol',
          seats: 5,
          doors: 4
        }
      },
      {
        _id: '7',
        id: 7,
        name: 'Tesla Model S',
        category: 'luxury',
        type: 'Car',
        description: 'Experience the future of driving with our Tesla Model S.',
        pricePerDay: 349,
        price: 349,
        year: 2023,
        status: 'available',
        fuel: 'Electric',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Autopilot', 'Supercharging', 'Premium Interior', 'Over-the-Air Updates'],
        specifications: {
          engine: 'Electric Motor',
          transmission: 'Single Speed',
          fuelType: 'Electric',
          seats: 5,
          doors: 4
        }
      },
      {
        _id: '8',
        id: 8,
        name: 'Range Rover Evoque',
        category: 'suv',
        type: 'Car',
        description: 'Conquer any terrain with style in our luxurious Range Rover Evoque.',
        pricePerDay: 249,
        price: 249,
        year: 2023,
        status: 'available',
        fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        features: ['All-Wheel Drive', 'Terrain Response', 'Premium Interior', 'Panoramic Roof'],
        specifications: {
          engine: '2.0L Turbo I4',
          transmission: 'Automatic',
          fuelType: 'Petrol',
          seats: 5,
          doors: 4
        }
      },
      {
        _id: '9',
        id: 9,
        name: 'Kawasaki Ninja ZX-10R',
        category: 'bike',
        type: 'Bike',
        description: 'Experience track-level performance with our Kawasaki Ninja ZX-10R.',
        pricePerDay: 299,
        price: 299,
        year: 2024,
        status: 'available',
        fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Track Mode', 'Quick Shifter', 'Traction Control', 'Racing ABS'],
        specifications: {
          engine: '998cc Inline-4',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol',
          seats: 2,
          topSpeed: '299 km/h'
        }
      }
    ];

    // Load users
    const savedUsers = localStorage.getItem('users');
    this.users = savedUsers ? JSON.parse(savedUsers) : [
      {
        _id: 'user1',
        id: 1,
        username: 'Wsx@123',
        name: 'Wsx User',
        email: 'wsx@gmail.com',
        role: 'user',
        createdAt: 'Apr 20, 2025'
      },
      {
        _id: 'user2',
        id: 2,
        username: 'sx@123',
        name: 'SX User',
        email: 'wsxedc@gmail.com',
        role: 'user',
        createdAt: 'Apr 21, 2025'
      },
      {
        _id: 'user3',
        id: 3,
        username: 'tej@123',
        name: 'Tej User',
        email: 'tej@gmail.com',
        role: 'user',
        createdAt: 'Apr 21, 2025'
      },
      {
        _id: 'user4',
        id: 4,
        username: 'dj@123',
        name: 'DJ User',
        email: 'dj@gmail.com',
        role: 'user',
        createdAt: 'Apr 21, 2025'
      }
    ];

    // Load bookings
    const savedBookings = localStorage.getItem('bookings');
    this.bookings = savedBookings ? JSON.parse(savedBookings) : [
      {
        _id: 'booking1',
        id: 1,
        user: 'Wsx@123',
        userId: 'user1',
        email: 'wsx@gmail.com',
        vehicle: {
          _id: '8',
          name: 'Range Rover Evoque',
          type: 'Car'
        },
        car: 'Range Rover',
        model: 'Evoque',
        startDate: '2023-05-01',
        endDate: '2023-05-03',
        pickupDate: 'May 01, 2023',
        returnDate: 'May 03, 2023',
        totalPrice: 498,
        totalPriceFormatted: '₹498.00',
        status: 'cancelled',
        createdAt: '2023-04-25T10:00:00Z'
      },
      {
        _id: 'booking2',
        id: 2,
        user: 'tej@123',
        userId: 'user3',
        email: 'tej@gmail.com',
        vehicle: {
          _id: '6',
          name: 'Mercedes-Benz S-Class',
          type: 'Car'
        },
        car: 'Mercedes-Benz',
        model: 'S-Class',
        startDate: '2025-04-22',
        endDate: '2025-04-24',
        pickupDate: 'Apr 22, 2025',
        returnDate: 'Apr 24, 2025',
        totalPrice: 598,
        totalPriceFormatted: '₹598.00',
        status: 'pending',
        createdAt: '2025-04-20T14:30:00Z'
      },
      {
        _id: 'booking3',
        id: 3,
        user: 'dj@123',
        userId: 'user4',
        email: 'dj@gmail.com',
        vehicle: {
          _id: '5',
          name: 'BMW M4 Coupe',
          type: 'Car'
        },
        car: 'BMW',
        model: 'M4 Coupe',
        startDate: '2025-04-22',
        endDate: '2025-04-24',
        pickupDate: 'Apr 22, 2025',
        returnDate: 'Apr 24, 2025',
        totalPrice: 798,
        totalPriceFormatted: '₹798.00',
        status: 'pending',
        createdAt: '2025-04-20T10:00:00Z'
      }
    ];
  }

  saveData() {
    localStorage.setItem('vehicles', JSON.stringify(this.vehicles));
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }

  // Vehicle methods
  getAllVehicles() {
    return Promise.resolve([...this.vehicles]);
  }

  getVehicleById(id) {
    const vehicle = this.vehicles.find(v => v._id === id || v.id.toString() === id);
    return Promise.resolve(vehicle ? { ...vehicle } : null);
  }

  updateVehicle(id, updates) {
    const index = this.vehicles.findIndex(v => v._id === id || v.id.toString() === id);
    if (index !== -1) {
      this.vehicles[index] = { ...this.vehicles[index], ...updates };
      this.saveData();
      return Promise.resolve({ ...this.vehicles[index] });
    }
    return Promise.resolve(null);
  }

  deleteVehicle(id) {
    const index = this.vehicles.findIndex(v => v._id === id || v.id.toString() === id);
    if (index !== -1) {
      const deleted = this.vehicles.splice(index, 1)[0];
      this.saveData();
      return Promise.resolve(deleted);
    }
    return Promise.resolve(null);
  }

  addVehicle(vehicleData) {
    const newId = Math.max(...this.vehicles.map(v => v.id)) + 1;
    const newVehicle = {
      _id: newId.toString(),
      id: newId,
      ...vehicleData,
      status: vehicleData.status || 'available'
    };
    this.vehicles.push(newVehicle);
    this.saveData();
    return Promise.resolve({ ...newVehicle });
  }

  // User methods
  getAllUsers() {
    return Promise.resolve([...this.users]);
  }

  getUserById(id) {
    const user = this.users.find(u => u._id === id || u.id.toString() === id);
    return Promise.resolve(user ? { ...user } : null);
  }

  deleteUser(id) {
    const index = this.users.findIndex(u => u._id === id || u.id.toString() === id);
    if (index !== -1) {
      const deleted = this.users.splice(index, 1)[0];
      this.saveData();
      return Promise.resolve(deleted);
    }
    return Promise.resolve(null);
  }

  // Booking methods
  getAllBookings() {
    return Promise.resolve([...this.bookings]);
  }

  getBookingById(id) {
    const booking = this.bookings.find(b => b._id === id || b.id.toString() === id);
    return Promise.resolve(booking ? { ...booking } : null);
  }

  updateBookingStatus(id, status) {
    const index = this.bookings.findIndex(b => b._id === id || b.id.toString() === id);
    if (index !== -1) {
      this.bookings[index] = { ...this.bookings[index], status };
      this.saveData();
      return Promise.resolve({ ...this.bookings[index] });
    }
    return Promise.resolve(null);
  }

  addBooking(bookingData) {
    const newId = Math.max(...this.bookings.map(b => b.id)) + 1;
    const newBooking = {
      _id: `booking${newId}`,
      id: newId,
      ...bookingData,
      createdAt: new Date().toISOString()
    };
    this.bookings.push(newBooking);
    this.saveData();
    return Promise.resolve({ ...newBooking });
  }

  // Statistics
  getStats() {
    return Promise.resolve({
      vehicles: this.vehicles.length,
      users: this.users.length,
      bookings: this.bookings.length,
      availableVehicles: this.vehicles.filter(v => v.status === 'available').length,
      pendingBookings: this.bookings.filter(b => b.status === 'pending').length,
      confirmedBookings: this.bookings.filter(b => b.status === 'confirmed').length,
      cancelledBookings: this.bookings.filter(b => b.status === 'cancelled').length
    });
  }
}

// Create singleton instance
const dataService = new DataService();

export default dataService;