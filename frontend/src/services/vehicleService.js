import axios from 'axios';

// Create axios instance with base URL
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

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getVehicles = async () => {
  try {
    const res = await api.get('/vehicles');
    return res.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};

export const getVehicleById = async (id) => {
  try {
    const res = await api.get(`/vehicles/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    throw error;
  }
};

export const createVehicle = async (data) => {
  try {
    const res = await api.post('/vehicles', data);
    return res.data;
  } catch (error) {
    console.error('Error creating vehicle:', error);
    throw error;
  }
};

export const updateVehicle = async (id, data) => {
  try {
    const res = await api.put(`/vehicles/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
};

export const deleteVehicle = async (id) => {
  try {
    const res = await api.delete(`/vehicles/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
};