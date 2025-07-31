import axios from 'axios';
import { Vehicle } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const vehicleService = {
  // Get all vehicles
  getAll: async (): Promise<Vehicle[]> => {
    try {
      const response = await api.get('/vehicles');
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      // Return mock data for development
      return [
        {
          _id: '1',
          name: 'Mercedes-Benz S-Class',
          category: 'luxury',
          description: 'Experience ultimate luxury with our premium Mercedes-Benz S-Class. Perfect for business trips and special occasions.',
          pricePerDay: 299,
          year: 2023,
          status: 'available',
          image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          features: ['Leather Seats', 'GPS Navigation', 'Bluetooth', 'Premium Sound System'],
          specifications: {
            engine: '3.0L V6 Turbo',
            transmission: 'Automatic',
            fuelType: 'Gasoline',
            seats: 5
          }
        },
        {
          _id: '2',
          name: 'BMW M4 Coupe',
          category: 'sports',
          description: 'Feel the thrill of driving with our high-performance BMW M4 Coupe. Built for speed and precision.',
          pricePerDay: 399,
          year: 2023,
          status: 'available',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          features: ['Sport Mode', 'Carbon Fiber Interior', 'Performance Brakes', 'Track Package'],
          specifications: {
            engine: '3.0L Twin-Turbo I6',
            transmission: 'Manual/Automatic',
            fuelType: 'Gasoline',
            seats: 4
          }
        },
        {
          _id: '3',
          name: 'Range Rover Evoque',
          category: 'suv',
          description: 'Conquer any terrain with style in our luxurious Range Rover Evoque. Perfect for adventures and city driving.',
          pricePerDay: 249,
          year: 2023,
          status: 'available',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          features: ['All-Wheel Drive', 'Terrain Response', 'Panoramic Roof', 'Premium Interior'],
          specifications: {
            engine: '2.0L Turbo I4',
            transmission: 'Automatic',
            fuelType: 'Gasoline',
            seats: 5
          }
        },
        {
          _id: '4',
          name: 'Tesla Model S',
          category: 'luxury',
          description: 'Experience the future of driving with our Tesla Model S. Zero emissions, maximum performance.',
          pricePerDay: 349,
          year: 2023,
          status: 'rented',
          image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          features: ['Autopilot', 'Supercharging', 'Premium Interior', 'Over-the-Air Updates'],
          specifications: {
            engine: 'Dual Motor Electric',
            transmission: 'Single Speed',
            fuelType: 'Electric',
            seats: 5
          }
        },
        {
          _id: '5',
          name: 'Audi A4 Sedan',
          category: 'sedan',
          description: 'Elegant and efficient, our Audi A4 offers the perfect balance of luxury and practicality.',
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
          }
        },
        {
          _id: '6',
          name: 'Porsche 911 Carrera',
          category: 'sports',
          description: 'The iconic sports car that defines performance. Experience pure driving pleasure with our Porsche 911.',
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
          }
        }
      ];
    }
  },

  // Get vehicle by ID
  getById: async (id: string): Promise<Vehicle | null> => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      return null;
    }
  },

  // Create new vehicle (admin only)
  create: async (vehicleData: Omit<Vehicle, '_id'>): Promise<Vehicle> => {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
  },

  // Update vehicle (admin only)
  update: async (id: string, vehicleData: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  },

  // Delete vehicle (admin only)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/vehicles/${id}`);
  },

  // Get vehicles by category
  getByCategory: async (category: string): Promise<Vehicle[]> => {
    try {
      const response = await api.get(`/vehicles?category=${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles by category:', error);
      return [];
    }
  },

  // Search vehicles
  search: async (query: string): Promise<Vehicle[]> => {
    try {
      const response = await api.get(`/vehicles/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching vehicles:', error);
      return [];
    }
  }
};

export default vehicleService;
