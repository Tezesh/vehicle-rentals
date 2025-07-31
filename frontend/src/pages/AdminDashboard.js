
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVehicles } from '../services/vehicleService';
import { getUsers } from '../services/userService';
import { getBookings } from '../services/bookingService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    vehicles: 0,
    users: 0,
    bookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch data from APIs
        const [vehiclesData, usersData, bookingsData] = await Promise.all([
          getVehicles().catch(() => []),
          getUsers().catch(() => []),
          getBookings().catch(() => [])
        ]);

        console.log('Dashboard data:', { vehiclesData, usersData, bookingsData });

        // Calculate stats
        const statsData = {
          vehicles: vehiclesData.length,
          users: usersData.length,
          bookings: bookingsData.length,
          availableVehicles: vehiclesData.filter(v => v.status === 'available').length,
          pendingBookings: bookingsData.filter(b => b.status === 'pending').length,
          confirmedBookings: bookingsData.filter(b => b.status === 'confirmed').length,
          cancelledBookings: bookingsData.filter(b => b.status === 'cancelled').length
        };
        setStats(statsData);

        // Get the 3 most recent bookings
        const recent = bookingsData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3)
          .map(booking => ({
            user: booking.user?.name || booking.user?.email || booking.email || 'Unknown User',
            car: booking.vehicle?.name || booking.car || 'Unknown Vehicle',
            pickup: booking.pickupDate || (booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'),
            return: booking.returnDate || (booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'),
            status: booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Unknown',
          }));
        setRecentBookings(recent);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: 200, background: '#2c3e50', color: '#fff', minHeight: '100vh' }} className="p-3">
        <h4 className="text-white mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white text-start w-100 p-2 active" onClick={() => navigate('/admin')}>
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
            <button className="btn btn-link text-white text-start w-100 p-2" onClick={() => navigate('/admin/bookings')}>
              <i className="fas fa-calendar-alt me-2"></i> Bookings
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1" style={{ background: '#ecf0f1' }}>
        <div className="d-flex justify-content-between align-items-center p-4 bg-white border-bottom">
          <h2 className="mb-0">Welcome, admin</h2>
          <button className="btn btn-outline-danger btn-sm" onClick={() => { localStorage.removeItem('token'); navigate('/admin/login'); }}>
            <i className="fas fa-sign-out-alt me-1"></i> Logout
          </button>
        </div>

        <div className="p-4">
          {/* Stats Cards */}
          <div className="row mb-4 g-3">
            <div className="col-md-4">
              <div className="card text-white" style={{ background: '#3498db' }}>
                <div className="card-body text-center">
                  <h1 className="display-4 mb-2">{stats.vehicles}</h1>
                  <p className="mb-0">Total Vehicles</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white" style={{ background: '#3498db' }}>
                <div className="card-body text-center">
                  <h1 className="display-4 mb-2">{stats.users}</h1>
                  <p className="mb-0">Total Users</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white" style={{ background: '#3498db' }}>
                <div className="card-body text-center">
                  <h1 className="display-4 mb-2">{stats.bookings}</h1>
                  <p className="mb-0">Total Bookings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
              <h4 className="mb-0">Recent Bookings</h4>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/admin/bookings')}>
                View All
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-striped mb-0">
                <thead style={{ background: '#f8f9fa' }}>
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Car</th>
                    <th className="px-4 py-3">Pickup Date</th>
                    <th className="px-4 py-3">Return Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3">{booking.user}</td>
                      <td className="px-4 py-3">{booking.car}</td>
                      <td className="px-4 py-3">{booking.pickup}</td>
                      <td className="px-4 py-3">{booking.return}</td>
                      <td className="px-4 py-3">
                        <span className={`badge ${
                          booking.status === 'Pending' ? 'bg-warning text-dark' :
                          booking.status === 'Cancelled' ? 'bg-danger' : 'bg-success'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="btn btn-success btn-sm">
                          <i className="fas fa-eye"></i>
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
    </div>
  );
};

export default AdminDashboard;