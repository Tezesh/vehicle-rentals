import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/userService';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Data is now managed by centralized dataService

  useEffect(() => {
    // Fetch users from backend API
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await getUsers();
        console.log('Fetched users for admin:', usersData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId && user._id !== userId));
        alert('User deleted successfully!');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
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
              <button className="btn btn-link text-white text-start w-100 p-2 active" onClick={() => navigate('/admin/users')}>
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
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading users...</p>
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
            <button className="btn btn-link text-white text-start w-100 p-2 active" onClick={() => navigate('/admin/users')}>
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
          <h2 className="mb-0">Manage Users</h2>
          <button className="btn btn-outline-danger btn-sm" onClick={() => { localStorage.removeItem('token'); navigate('/admin/login'); }}>
            <i className="fas fa-sign-out-alt me-1"></i> Logout
          </button>
        </div>

        <div className="p-4">
          <div className="bg-white rounded shadow-sm">
            <div className="table-responsive">
              <table className="table table-striped mb-0">
                <thead style={{ background: '#f8f9fa' }}>
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Username</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Created At</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id || user._id}>
                        <td className="px-4 py-3">{user.id || user._id || 'N/A'}</td>
                        <td className="px-4 py-3">{user.username || user.name || 'N/A'}</td>
                        <td className="px-4 py-3">{user.email || 'N/A'}</td>
                        <td className="px-4 py-3">{user.createdAt || 'N/A'}</td>
                        <td className="px-4 py-3">
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() => handleViewUser(user)}
                          >
                            <i className="fas fa-eye me-1"></i> View
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteUser(user.id || user._id)}
                          >
                            <i className="fas fa-trash me-1"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        {loading ? 'Loading users...' : 'No registered users found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details - ID: {selectedUser.id || selectedUser._id || 'N/A'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedUser(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <h6 className="fw-bold mb-3">User Information</h6>
                    <p><strong>ID:</strong> {selectedUser.id || selectedUser._id || 'N/A'}</p>
                    <p><strong>Username:</strong> {selectedUser.username || selectedUser.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {selectedUser.email || 'N/A'}</p>
                    <p><strong>Created At:</strong> {selectedUser.createdAt || 'N/A'}</p>
                    <p><strong>Status:</strong> <span className="badge bg-success">Active</span></p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedUser(null);
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    handleDeleteUser(selectedUser.id || selectedUser._id);
                    setShowModal(false);
                    setSelectedUser(null);
                  }}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
