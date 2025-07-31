import { ComponentType } from 'react';

export type Vehicle = {
  _id: string;
  name: string;
  category: string;
  pricePerDay: number;
  pricePerHour?: number;
  description: string;
  image?: string;
  year: number;
  status: 'available' | 'rented' | 'maintenance';
  features?: string[];
  specifications?: {
    engine: string;
    transmission: string;
    fuelType: string;
    seats: number;
  };
  createdAt?: string;
};

export type VehicleType = 'car' | 'bike' | 'truck' | 'van' | 'auto';

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: ComponentType;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
};

export type Booking = {
  _id: string;
  user: string | User;
  vehicle: string | Vehicle;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
};
