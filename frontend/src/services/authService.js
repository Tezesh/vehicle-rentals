import axios from 'axios';

export const register = async (data) => {
  const res = await axios.post('/api/users/register', data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post('/api/users/login', data);
  return res.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('/api/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}; 