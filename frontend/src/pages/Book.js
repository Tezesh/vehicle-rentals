import React, { useState, useEffect } from 'react';
import { createBooking } from '../services/bookingService';
import { getVehicles } from '../services/vehicleService';

const Book = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getVehicles().then(setVehicles);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await createBooking({ vehicle: vehicleId, startDate, endDate });
      setSuccess('Booking submitted successfully! Your booking is pending confirmation.');
      setVehicleId('');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-2" style={{ fontWeight: 700 }}>Book a Car</h1>
      <p className="text-center mb-4 text-muted" style={{ fontSize: '1.2rem' }}>Make your reservation today</p>
      <div className="d-flex justify-content-center">
        <form className="bg-white p-4 rounded shadow" style={{ minWidth: 400, maxWidth: 500 }} onSubmit={handleSubmit}>
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row mb-3">
            <div className="col-12 mb-3">
              <label className="form-label fw-bold">Select Car</label>
              <select className="form-select" value={vehicleId} onChange={e => setVehicleId(e.target.value)} required>
                <option value="">Choose a car</option>
                {vehicles.map(v => (
                  <option key={v._id} value={v._id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Pickup Date</label>
              <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Return Date</label>
              <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Submitting...' : 'SUBMIT BOOKING'}</button>
        </form>
      </div>
    </div>
  );
};

export default Book;
