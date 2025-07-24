import axios from 'axios';

export const createBooking = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post('/api/bookings', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getUserBookings = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('/api/bookings/my', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}; 