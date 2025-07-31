import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, updateBookingStatus } from '../services/bookingService';

const AllBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock bookings data matching your screenshot
  const mockBookings = [
    {
      id: 3,
      user: 'dj@123',
      email: 'dj@gmail.com',
      car: 'Ferrari',
      model: 'Roma',
      pickupDate: 'Apr 22, 2025',
      returnDate: 'Apr 24, 2025',
      totalPrice: '₹200,000.00',
      status: 'Pending'
    },
    {
      id: 2,
      user: 'tej@123',
      email: 'tej@gmail.com',
      car: 'Mercedes-Benz',
      model: 'S-Class',
      pickupDate: 'Apr 22, 2025',
      returnDate: 'Apr 24, 2025',
      totalPrice: '₹140,000.00',
      status: 'Pending'
    },
    {
      id: 1,
      user: 'Wsx@123',
      email: 'wsx@gmail.com',
      car: 'Toyota',
      model: 'Fortuner',
      pickupDate: 'May 01, 2023',
      returnDate: 'May 03, 2023',
      totalPrice: '₹400.00',
      status: 'Cancelled'
    }
  ];

  useEffect(() => {
    // Fetch bookings from backend API
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const bookingsData = await getBookings();
        console.log('Fetched all bookings for admin:', bookingsData);
        setBookings(bookingsData);
        setFilteredBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
        setFilteredBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on status
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setFilteredBookings(bookings);
    } else {
      // Handle case-insensitive filtering
      setFilteredBookings(bookings.filter(booking =>
        booking.status && booking.status.toLowerCase() === filter.toLowerCase()
      ));
    }
  };

  if (loading) {
    return (
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside style={{ width: 200, background: '#2c3e50', color: '#fff', minHeight: '100vh' }} className="p-3">
          <h4 className="text-white mb-4">Admin Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button className="btn btn-link text-white text-start w-100 p-2" onClick={() => navigate('/admin')}>
                <i className="fas fa-tachometer-alt me-2"></i> Dashboard
              </button>
            </li>
            <li className="nav-item mb-2">
              <button className="btn btn-link text-white text-start w-100 p-2" onClick={() => navigate('/admin/cars')}>
                <i className="fas fa-motorcycle me-2"></i> Vehicles
              </button>
            </li>
            <li className="nav-item mb-2">
              <button className="btn btn-link text-white text-start w-100 p-2" onClick={() => navigate('/admin/users')}>
                <i className="fas fa-users me-2"></i> Users
              </button>
            </li>
            <li className="nav-item mb-2">
              <button className="btn btn-link text-white text-start w-100 p-2 active" onClick={() => navigate('/admin/bookings')}>
                <i className="fas fa-calendar-alt me-2"></i> Bookings
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1" style={{ background: '#ecf0f1' }}>
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading bookings...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: 200, background: '#2c3e50', color: '#fff', minHeight: '100vh' }} className="p-3">
        <h4 className="text-white mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white text-start w-100 p-2" onClick={() => navigate('/admin')}>
              <i className="fas fa-tachometer-alt me-2"></i> Dashboard
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white text-start w-100 p-2" onClick={() => navigate('/admin/cars')}>
              <i className="fas fa-motorcycle me-2"></i> Vehicles
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white text-start w-100 p-2" onClick={() => navigate('/admin/users')}>
              <i className="fas fa-users me-2"></i> Users
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white text-start w-100 p-2 active" onClick={() => navigate('/admin/bookings')}>
              <i className="fas fa-calendar-alt me-2"></i> Bookings
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1" style={{ background: '#ecf0f1' }}>
        <div className="d-flex justify-content-between align-items-center p-4 bg-white border-bottom">
          <h2 className="mb-0">Manage Bookings</h2>
          <button className="btn btn-outline-danger btn-sm" onClick={() => { localStorage.removeItem('token'); navigate('/admin/login'); }}>
            <i className="fas fa-sign-out-alt me-1"></i> Logout
          </button>
        </div>

        <div className="p-4">
          {/* Filter Buttons */}
          <div className="mb-4">
            <button
              className={`btn me-2 ${activeFilter === 'All' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('All')}
            >
              All
            </button>
            <button
              className={`btn me-2 ${activeFilter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => handleFilterChange('pending')}
            >
              Pending
            </button>
            <button
              className={`btn me-2 ${activeFilter === 'confirmed' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => handleFilterChange('confirmed')}
            >
              Confirmed
            </button>
            <button
              className={`btn me-2 ${activeFilter === 'cancelled' ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => handleFilterChange('cancelled')}
            >
              Cancelled
            </button>
          </div>

          <div className="bg-white rounded shadow-sm">
            <div className="table-responsive">
              <table className="table table-striped mb-0">
                <thead style={{ background: '#f8f9fa' }}>
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Car</th>
                    <th className="px-4 py-3">Pickup Date</th>
                    <th className="px-4 py-3">Return Date</th>
                    <th className="px-4 py-3">Total Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id || booking._id}>
                      <td className="px-4 py-3">{booking.id || booking._id}</td>
                      <td className="px-4 py-3">
                        <div>
                          <div>{booking.user?.name || booking.user?.email || booking.user || 'Unknown User'}</div>
                          <small className="text-muted">{booking.user?.email || booking.email || 'No email'}</small>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <div>{booking.vehicle?.name || booking.car || 'Unknown Vehicle'}</div>
                          <small className="text-muted">{booking.vehicle?.type || booking.model || 'Unknown Model'}</small>
                        </div>
                      </td>
                      <td className="px-4 py-3">{booking.pickupDate || (booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A')}</td>
                      <td className="px-4 py-3">{booking.returnDate || (booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A')}</td>
                      <td className="px-4 py-3">${booking.totalPrice || booking.totalAmount || 'N/A'}</td>
                      <td className="px-4 py-3">
                        <select
                          className={`form-select form-select-sm ${
                            (booking.status && booking.status.toLowerCase() === 'pending') ? 'text-warning' :
                            (booking.status && booking.status.toLowerCase() === 'confirmed') ? 'text-success' :
                            'text-danger'
                          }`}
                          value={booking.status || 'pending'}
                          onChange={async (e) => {
                            try {
                              // Update status using booking service
                              await updateBookingStatus(booking._id || booking.id, e.target.value);

                              // Update local state
                              const updatedBookings = bookings.map(b =>
                                (b.id === booking.id || b._id === booking._id) ? { ...b, status: e.target.value } : b
                              );
                              setBookings(updatedBookings);
                              if (activeFilter === 'All') {
                                setFilteredBookings(updatedBookings);
                              } else {
                                setFilteredBookings(updatedBookings.filter(b =>
                                  b.status && b.status.toLowerCase() === activeFilter.toLowerCase()
                                ));
                              }
                            } catch (error) {
                              console.error('Error updating booking status:', error);
                              alert('Failed to update booking status. Please try again.');
                            }
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowModal(true);
                          }}
                        >
                          <i className="fas fa-eye me-1"></i> View
                        </button>
                        <button className="btn btn-primary btn-sm">
                          <i className="fas fa-edit me-1"></i> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Booking Details - ID: {selectedBooking.id || selectedBooking._id || 'N/A'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedBooking(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3">Customer Information</h6>
                    <p><strong>Username:</strong> {
                      typeof selectedBooking.user === 'object'
                        ? (selectedBooking.user?.name || selectedBooking.user?.email || 'Unknown User')
                        : (selectedBooking.user || 'Unknown User')
                    }</p>
                    <p><strong>Email:</strong> {
                      typeof selectedBooking.user === 'object'
                        ? (selectedBooking.user?.email || 'No email')
                        : (selectedBooking.email || 'No email')
                    }</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3">Vehicle Information</h6>
                    <p><strong>Vehicle:</strong> {
                      typeof selectedBooking.vehicle === 'object'
                        ? (selectedBooking.vehicle?.name || 'Unknown Vehicle')
                        : (selectedBooking.car || 'Unknown Vehicle')
                    }</p>
                    <p><strong>Model:</strong> {
                      typeof selectedBooking.vehicle === 'object'
                        ? (selectedBooking.vehicle?.type || selectedBooking.vehicle?.model || 'Unknown Model')
                        : (selectedBooking.model || 'Unknown Model')
                    }</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3">Booking Details</h6>
                    <p><strong>Pickup Date:</strong> {
                      selectedBooking.pickupDate ||
                      (selectedBooking.startDate ? new Date(selectedBooking.startDate).toLocaleDateString() : 'N/A')
                    }</p>
                    <p><strong>Return Date:</strong> {
                      selectedBooking.returnDate ||
                      (selectedBooking.endDate ? new Date(selectedBooking.endDate).toLocaleDateString() : 'N/A')
                    }</p>
                    <p><strong>Total Price:</strong> <span className="text-success fw-bold">
                      ${selectedBooking.totalPrice || 'N/A'}
                    </span></p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3">Status</h6>
                    <span className={`badge fs-6 ${
                      selectedBooking.status === 'pending' || selectedBooking.status === 'Pending' ? 'bg-warning text-dark' :
                      selectedBooking.status === 'confirmed' || selectedBooking.status === 'Confirmed' ? 'bg-success' :
                      'bg-danger'
                    }`}>
                      {selectedBooking.status || 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedBooking(null);
                  }}
                >
                  Close
                </button>
                <div className="btn-group">
                  <button
                    className="btn btn-warning"
                    onClick={async () => {
                      try {
                        // Update booking status to Pending via API
                        await updateBookingStatus(selectedBooking._id || selectedBooking.id, 'pending');

                        // Update local state
                        const updatedBookings = bookings.map(b =>
                          (b.id === selectedBooking.id || b._id === selectedBooking._id) ? { ...b, status: 'pending' } : b
                        );
                        setBookings(updatedBookings);
                        if (activeFilter === 'All') {
                          setFilteredBookings(updatedBookings);
                        } else {
                          setFilteredBookings(updatedBookings.filter(b => b.status === activeFilter));
                        }
                        setShowModal(false);
                        setSelectedBooking(null);
                      } catch (error) {
                        console.error('Error updating booking status:', error);
                        alert('Failed to update booking status. Please try again.');
                      }
                    }}
                  >
                    Mark Pending
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={async () => {
                      try {
                        // Update booking status to Confirmed via API
                        await updateBookingStatus(selectedBooking._id || selectedBooking.id, 'confirmed');

                        // Update local state
                        const updatedBookings = bookings.map(b =>
                          (b.id === selectedBooking.id || b._id === selectedBooking._id) ? { ...b, status: 'confirmed' } : b
                        );
                        setBookings(updatedBookings);
                        if (activeFilter === 'All') {
                          setFilteredBookings(updatedBookings);
                        } else {
                          setFilteredBookings(updatedBookings.filter(b => b.status === activeFilter));
                        }
                        setShowModal(false);
                        setSelectedBooking(null);
                      } catch (error) {
                        console.error('Error updating booking status:', error);
                        alert('Failed to update booking status. Please try again.');
                      }
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={async () => {
                      try {
                        // Update booking status to Cancelled via API
                        await updateBookingStatus(selectedBooking._id || selectedBooking.id, 'cancelled');

                        // Update local state
                        const updatedBookings = bookings.map(b =>
                          (b.id === selectedBooking.id || b._id === selectedBooking._id) ? { ...b, status: 'cancelled' } : b
                        );
                        setBookings(updatedBookings);
                        if (activeFilter === 'All') {
                          setFilteredBookings(updatedBookings);
                        } else {
                          setFilteredBookings(updatedBookings.filter(b => b.status === activeFilter));
                        }
                        setShowModal(false);
                        setSelectedBooking(null);
                      } catch (error) {
                        console.error('Error updating booking status:', error);
                        alert('Failed to update booking status. Please try again.');
                      }
                    }}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
