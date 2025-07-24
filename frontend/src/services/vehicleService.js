import axios from 'axios';

export const getVehicles = async () => {
  const res = await axios.get('/api/vehicles');
  return res.data;
};

export const createVehicle = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post('/api/vehicles', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateVehicle = async (id, data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(`/api/vehicles/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}; 