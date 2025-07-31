import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserBookings } from '../services/bookingService';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock bookings data with bikes and cars
  const mockBookings = [
    {
      _id: 'booking1',
      vehicle: {
        _id: '1',
        name: 'Yamaha R15 V4',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        type: 'Bike'
      },
      startDate: '2024-01-15',
      endDate: '2024-01-18',
      totalPrice: 897,
      status: 'confirmed',
      createdAt: '2024-01-10T10:00:00Z'
    },
    {
      _id: 'booking2',
      vehicle: {
        _id: '2',
        name: 'KTM Duke 390',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        type: 'Bike'
      },
      startDate: '2024-02-01',
      endDate: '2024-02-03',
      totalPrice: 1197,
      status: 'pending',
      createdAt: '2024-01-25T14:30:00Z'
    },
    {
      _id: 'booking3',
      vehicle: {
        _id: '3',
        name: 'BMW M4 Coupe',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        type: 'Car'
      },
      startDate: '2023-12-20',
      endDate: '2023-12-23',
      totalPrice: 2697,
      status: 'completed',
      createdAt: '2023-12-15T09:15:00Z'
    },
    {
      _id: 'booking4',
      vehicle: {
        _id: '4',
        name: 'Royal Enfield Classic 350',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        type: 'Bike'
      },
      startDate: '2024-03-10',
      endDate: '2024-03-12',
      totalPrice: 498,
      status: 'confirmed',
      createdAt: '2024-03-05T12:00:00Z'
    }
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        // Fetch user bookings from backend API
        const bookingsData = await getUserBookings();
        console.log('Fetched user bookings:', bookingsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-warning text-dark',
      confirmed: 'bg-success',
      completed: 'bg-secondary',
      cancelled: 'bg-danger'
    };

    return `badge ${statusClasses[status] || 'bg-secondary'}`;
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        // Update booking status using centralized data service
        await dataService.updateBookingStatus(bookingId, 'cancelled');

        // Update local state
        setBookings(bookings.map(booking =>
          booking._id === bookingId || booking.id === bookingId
            ? { ...booking, status: 'cancelled' }
            : booking
        ));
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 fw-bold">My Bookings</h1>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              <i className="fas fa-plus me-2"></i>
              Book New Vehicle
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
              <h3>No Bookings Found</h3>
              <p className="text-muted">You haven't made any bookings yet.</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/')}
              >
                Browse Vehicles
              </button>
            </div>
          ) : (
            <div className="row">
              {bookings.map((booking) => (
                <div key={booking._id} className="col-lg-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={booking.vehicle.image}
                          alt={booking.vehicle.name}
                          className="img-fluid rounded-start h-100"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h5 className="card-title">{booking.vehicle.name}</h5>
                              <span className={`badge ${booking.vehicle.type === 'Bike' ? 'bg-info' : 'bg-secondary'} mb-2`}>
                                {booking.vehicle.type}
                              </span>
                            </div>
                            <span className={getStatusBadge(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="mb-3">
                            <div className="row text-sm">
                              <div className="col-6">
                                <strong>Pickup:</strong><br />
                                <small className="text-muted">{formatDate(booking.startDate)}</small>
                              </div>
                              <div className="col-6">
                                <strong>Return:</strong><br />
                                <small className="text-muted">{formatDate(booking.endDate)}</small>
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="row">
                              <div className="col-6">
                                <strong>Duration:</strong><br />
                                <small className="text-muted">{calculateDays(booking.startDate, booking.endDate)} days</small>
                              </div>
                              <div className="col-6">
                                <strong>Total:</strong><br />
                                <strong className="text-primary">${booking.totalPrice}</strong>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => navigate(`/vehicles/${booking.vehicle._id}`)}
                            >
                              View Vehicle
                            </button>
                            {booking.status === 'pending' && (
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleCancelBooking(booking._id)}
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
