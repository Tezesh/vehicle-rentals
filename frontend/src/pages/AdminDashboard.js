
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  // Example static data
  const stats = {
    cars: 6,
    users: 1,
    bookings: 1,
  };
  const recentBookings = [
    {
      user: 'new',
      car: 'Audi R8',
      pickup: 'Jul 12, 2025',
      return: 'Aug 01, 2025',
      status: 'Pending',
    },
  ];

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: '#f6f8fa' }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: '#25344e', color: '#fff', minHeight: '100vh' }} className="p-4">
        <h2 className="fw-bold mb-4" style={{ fontSize: '2rem' }}>Admin Panel</h2>
        <ul className="nav flex-column gap-3">
          <li className="nav-item">
            <button className="btn btn-link text-white text-start w-100" onClick={() => navigate('/admin')}> <i className="fas fa-home me-2"></i> Dashboard </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-link text-white text-start w-100" onClick={() => navigate('/admin/cars')}> <i className="fas fa-car me-2"></i> Cars </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-link text-white text-start w-100" onClick={() => navigate('/admin/users')}> <i className="fas fa-users me-2"></i> Users </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-link text-white text-start w-100" onClick={() => navigate('/admin/bookings')}> <i className="fas fa-calendar-alt me-2"></i> Bookings </button>
          </li>
        </ul>
      </aside>
      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Welcome, admin</h1>
          <button className="btn btn-danger" onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>
            <i className="fas fa-sign-out-alt me-2"></i> Logout
          </button>
        </div>
        <div className="row mb-4 g-3">
          <div className="col-md-4">
            <div className="bg-primary text-white rounded p-4 text-center shadow-sm">
              <h2 className="mb-1">{stats.cars}</h2>
              <p className="mb-0">Total Cars</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-primary text-white rounded p-4 text-center shadow-sm">
              <h2 className="mb-1">{stats.users}</h2>
              <p className="mb-0">Total Users</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-primary text-white rounded p-4 text-center shadow-sm">
              <h2 className="mb-1">{stats.bookings}</h2>
              <p className="mb-0">Total Bookings</p>
            </div>
          </div>
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">Recent Bookings</h3>
              <button className="btn btn-primary" onClick={() => navigate('/admin/bookings')}>View All</button>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>User</th>
                    <th>Car</th>
                    <th>Pickup Date</th>
                    <th>Return Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b, idx) => (
                    <tr key={idx}>
                      <td>{b.user}</td>
                      <td>{b.car}</td>
                      <td>{b.pickup}</td>
                      <td>{b.return}</td>
                      <td><span className="badge bg-warning text-dark">{b.status}</span></td>
                      <td>
                        <button className="btn btn-success btn-sm" title="View">
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