import api from './api';

export const getUsers = async () => {
  try {
    const res = await api.get('/users');
    return res.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    const res = await api.get('/users/stats');
    return res.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};
