import React, { useState } from 'react';
import { createVehicle, updateVehicle } from '../services/vehicleService';

const AdminVehicleForm = ({ vehicle, onSaved }) => {
  const [form, setForm] = useState(vehicle || { name: '', type: '', pricePerDay: '', description: '', image: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (vehicle) {
        await updateVehicle(vehicle._id, form);
      } else {
        await createVehicle(form);
      }
      setError('');
      if (onSaved) onSaved();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{vehicle ? 'Edit' : 'Add'} Vehicle</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="type" value={form.type} onChange={handleChange} placeholder="Type" required />
      <input name="pricePerDay" value={form.pricePerDay} onChange={handleChange} placeholder="Price per day" required type="number" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">Save</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
};

export default AdminVehicleForm; 