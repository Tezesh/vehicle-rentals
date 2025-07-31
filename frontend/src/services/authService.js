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

export const register = async (data) => {
  try {
    const res = await api.post('/users/register', data);
    return res.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const res = await api.post('/users/login', data);
    return res.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const res = await api.get('/users/me');
    return res.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};