import React, { useState } from 'react';
import { createBooking } from '../services/bookingService';

const BookingForm = ({ vehicleId, onBooked }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking({ vehicle: vehicleId, startDate, endDate });
      setStartDate('');
      setEndDate('');
      setError('');
      if (onBooked) onBooked();
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Book this vehicle</h3>
      <label>Start Date: <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required /></label><br/>
      <label>End Date: <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required /></label><br/>
      <button type="submit">Book</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
};

export default BookingForm; 