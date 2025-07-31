import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageTestimonials = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [stats, setStats] = useState({});

  // Form state for adding new testimonial
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    email: '',
    image: '',
    quote: '',
    rating: 5
  });

  // Fetch testimonials from API
  useEffect(() => {
    fetchTestimonials();
    fetchStats();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/testimonials/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
        setFilteredTestimonials(data);
      } else {
        console.error('Failed to fetch testimonials');
        // Fallback to sample data
        const sampleTestimonials = [
          {
            _id: '1',
            name: 'Sarah Chen',
            role: 'Wedding Planner',
            email: 'sarah@example.com',
            image: 'https://res.cloudinary.com/dz7pl7mlf/image/upload/v1745251929/yzpwprwge2msh67wmvzo.jpg',
            quote: 'As a car enthusiast, I was blown away by their collection. The Ferrari 488 was perfectly maintained and the team\'s knowledge about the vehicles is impressive. Will definitely rent again!',
            rating: 5,
            isApproved: true,
            isActive: true,
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            name: 'Michael Roberts',
            role: 'Car Enthusiast',
            email: 'michael@example.com',
            image: 'https://res.cloudinary.com/dz7pl7mlf/image/upload/v1745251787/rsflbsvuxsexcdiw5vss.jpg',
            quote: 'Toyota is best car according to the budget and comfort it gives nice mileage and is fully loaded with features. Looks of the car is awesome.',
            rating: 4,
            isApproved: true,
            isActive: true,
            createdAt: new Date().toISOString()
          },
          {
            _id: '3',
            name: 'James Wilson',
            role: 'Business Executive',
            email: 'james@example.com',
            image: 'https://res.cloudinary.com/dz7pl7mlf/image/upload/v1745251679/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr_ejkby9.jpg',
            quote: 'Mercedes-Benz vehicles consistently receive positive reviews, particularly for their luxury interiors, stylish designs, and advanced technology features.',
            rating: 5,
            isApproved: false,
            isActive: true,
            createdAt: new Date().toISOString()
          }
        ];
        setTestimonials(sampleTestimonials);
        setFilteredTestimonials(sampleTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/testimonials/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setFilteredTestimonials(testimonials);
    } else if (filter === 'Approved') {
      setFilteredTestimonials(testimonials.filter(t => t.isApproved));
    } else if (filter === 'Pending') {
      setFilteredTestimonials(testimonials.filter(t => !t.isApproved));
    } else if (filter === 'Active') {
      setFilteredTestimonials(testimonials.filter(t => t.isActive));
    } else if (filter === 'Inactive') {
      setFilteredTestimonials(testimonials.filter(t => !t.isActive));
    }
  };

  const handleApprove = async (testimonialId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/testimonials/${testimonialId}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        fetchTestimonials();
        fetchStats();
      } else {
        alert('Failed to approve testimonial');
      }
    } catch (error) {
      console.error('Error approving testimonial:', error);
      alert('Error approving testimonial');
    }
  };

  const handleToggleStatus = async (testimonialId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/testimonials/${testimonialId}/toggle-status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        fetchTestimonials();
        fetchStats();
      } else {
        alert('Failed to toggle testimonial status');
      }
    } catch (error) {
      console.error('Error toggling testimonial status:', error);
      alert('Error toggling testimonial status');
    }
  };

  const handleDelete = async (testimonialId) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/testimonials/${testimonialId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          fetchTestimonials();
          fetchStats();
        } else {
          alert('Failed to delete testimonial');
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Error deleting testimonial');
      }
    }
  };

  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/testimonials', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTestimonial)
      });

      if (response.ok) {
        setShowAddModal(false);
        setNewTestimonial({
          name: '',
          role: '',
          email: '',
          image: '',
          quote: '',
          rating: 5
        });
        fetchTestimonials();
        fetchStats();
      } else {
        alert('Failed to add testimonial');
      }
    } catch (error) {
      console.error('Error adding testimonial:', error);
      alert('Error adding testimonial');
    }
  };

  const getStatusBadgeClass = (testimonial) => {
    if (!testimonial.isActive) return 'bg-secondary';
    if (!testimonial.isApproved) return 'bg-warning text-dark';
    return 'bg-success';
  };

  const getStatusText = (testimonial) => {
    if (!testimonial.isActive) return 'Inactive';
    if (!testimonial.isApproved) return 'Pending';
    return 'Approved';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i 
        key={i} 
        className={`fas fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}
      ></i>
    ));
  };

  if (loading) {
    return (
      <div className="d-flex" style={{ minHeight: '100vh', background: '#f6f8fa' }}>
        {/* Sidebar */}
        <aside style={{ width: 260, background: '#25344e', color: '#fff', minHeight: '100vh' }} className="p-4">
          <h2 className="fw-bold mb-4" style={{ fontSize: '2rem' }}>Admin Panel</h2>
          <ul className="nav flex-column gap-3">
            <li className="nav-item">
              <button className="btn btn-link text-white text-start w-100" onClick={() => navigate('/admin')}>
                <i className="fas fa-home me-2"></i> Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-white text-start w-100" onClick={() => navigate('/admin/cars')}>
                <i className="fas fa-car me-2"></i> Cars
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-white text-start w-100" onClick={() => navigate('/admin/users')}>
                <i className="fas fa-users me-2"></i> Users
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-white text-start w-100" onClick={() => navigate('/admin/bookings')}>
                <i className="fas fa-calendar-alt me-2"></i> Bookings
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-white text-start w-100" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => navigate('/admin/testimonials')}>
                <i className="fas fa-star me-2"></i> Testimonials
              </button>
            </li>
          </ul>
        </aside>
        
        {/* Main Content */}
        <main className="flex-grow-1 p-4">
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: '#f6f8fa' }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: '#25344e', color: '#fff', minHeight: '100vh' }} className="p-4">
        <h2 className="fw-bold mb-4" style={{ fontSize: '2rem' }}>Admin Panel</h2>
        <ul className="nav flex-column gap-3">
          <li className="nav-item">
            <button className="btn btn-link text-white text-start w-100" onClick={() => navigate('/admin')}>
              <i className="fas fa-home me-2"></i> Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-link text-white text-start w-100" onClick={() => navigate('/admin/cars')}>
              <i className="fas fa-car me-2"></i> Cars
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-link text-white text-start w-100" onClick={() => navigate('/admin/users')}>
              <i className="fas fa-users me-2"></i> Users
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-link text-white text-start w-100" onClick={() => navigate('/admin/bookings')}>
              <i className="fas fa-calendar-alt me-2"></i> Bookings
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-link text-white text-start w-100" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => navigate('/admin/testimonials')}>
              <i className="fas fa-star me-2"></i> Testimonials
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Manage Testimonials</h1>
          <div>
            <button 
              className="btn btn-success me-2"
              onClick={() => setShowAddModal(true)}
            >
              <i className="fas fa-plus me-2"></i> Add Testimonial
            </button>
            <button className="btn btn-danger" onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>
              <i className="fas fa-sign-out-alt me-2"></i> Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4 g-3">
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-primary">{stats.total || testimonials.length}</h5>
                <p className="card-text text-muted">Total Testimonials</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-success">{stats.approved || testimonials.filter(t => t.isApproved).length}</h5>
                <p className="card-text text-muted">Approved</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-warning">{stats.pending || testimonials.filter(t => !t.isApproved).length}</h5>
                <p className="card-text text-muted">Pending</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-info">{stats.averageRating ? stats.averageRating.toFixed(1) : '4.8'}</h5>
                <p className="card-text text-muted">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-4">
          {['All', 'Approved', 'Pending', 'Active', 'Inactive'].map(filter => (
            <button
              key={filter}
              className={`btn me-2 ${activeFilter === filter ? 
                (filter === 'All' ? 'btn-primary' : 
                 filter === 'Approved' ? 'btn-success' :
                 filter === 'Pending' ? 'btn-warning' :
                 filter === 'Active' ? 'btn-info' : 'btn-secondary') : 
                'btn-outline-secondary'}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Testimonials Table */}
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Customer</th>
                    <th>Quote</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTestimonials.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                        <p className="text-muted">No testimonials found for the selected filter.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredTestimonials.map((testimonial) => (
                      <tr key={testimonial._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="rounded-circle me-3"
                              width="50"
                              height="50"
                              style={{ objectFit: 'cover' }}
                            />
                            <div>
                              <div className="fw-semibold">{testimonial.name}</div>
                              <small className="text-muted">{testimonial.role}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ maxWidth: '300px' }}>
                            {testimonial.quote.length > 100 
                              ? `${testimonial.quote.substring(0, 100)}...` 
                              : testimonial.quote}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {renderStars(testimonial.rating)}
                            <span className="ms-2 text-muted">({testimonial.rating})</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(testimonial)}`}>
                            {getStatusText(testimonial)}
                          </span>
                        </td>
                        <td>
                          {new Date(testimonial.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="btn-group">
                            <button 
                              className="btn btn-primary btn-sm"
                              title="View Details"
                              onClick={() => {
                                setSelectedTestimonial(testimonial);
                                setShowModal(true);
                              }}
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            {!testimonial.isApproved && (
                              <button 
                                className="btn btn-success btn-sm"
                                title="Approve"
                                onClick={() => handleApprove(testimonial._id)}
                              >
                                <i className="fas fa-check"></i>
                              </button>
                            )}
                            <button 
                              className="btn btn-warning btn-sm"
                              title={testimonial.isActive ? 'Deactivate' : 'Activate'}
                              onClick={() => handleToggleStatus(testimonial._id)}
                            >
                              <i className={`fas ${testimonial.isActive ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                            <button 
                              className="btn btn-danger btn-sm"
                              title="Delete"
                              onClick={() => handleDelete(testimonial._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Testimonial Details Modal */}
        {showModal && selectedTestimonial && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Testimonial Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-4 text-center">
                      <img
                        src={selectedTestimonial.image}
                        alt={selectedTestimonial.name}
                        className="rounded-circle mb-3"
                        width="120"
                        height="120"
                        style={{ objectFit: 'cover' }}
                      />
                      <h5>{selectedTestimonial.name}</h5>
                      <p className="text-muted">{selectedTestimonial.role}</p>
                      <div className="mb-2">
                        {renderStars(selectedTestimonial.rating)}
                      </div>
                      <span className={`badge ${getStatusBadgeClass(selectedTestimonial)} fs-6`}>
                        {getStatusText(selectedTestimonial)}
                      </span>
                    </div>
                    <div className="col-md-8">
                      <h6 className="fw-bold mb-3">Customer Review</h6>
                      <blockquote className="blockquote">
                        <p>"{selectedTestimonial.quote}"</p>
                      </blockquote>
                      <hr />
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>Email:</strong> {selectedTestimonial.email}</p>
                          <p><strong>Rating:</strong> {selectedTestimonial.rating}/5</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Submitted:</strong> {new Date(selectedTestimonial.createdAt).toLocaleDateString()}</p>
                          <p><strong>Status:</strong> {getStatusText(selectedTestimonial)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {!selectedTestimonial.isApproved && (
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleApprove(selectedTestimonial._id);
                        setShowModal(false);
                      }}
                    >
                      <i className="fas fa-check me-2"></i>Approve
                    </button>
                  )}
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      handleToggleStatus(selectedTestimonial._id);
                      setShowModal(false);
                    }}
                  >
                    <i className={`fas ${selectedTestimonial.isActive ? 'fa-eye-slash' : 'fa-eye'} me-2`}></i>
                    {selectedTestimonial.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Testimonial Modal */}
        {showAddModal && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Testimonial</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleAddTestimonial}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">Customer Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={newTestimonial.name}
                            onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="role" className="form-label">Role/Title *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="role"
                            value={newTestimonial.role}
                            onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email *</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={newTestimonial.email}
                            onChange={(e) => setNewTestimonial({...newTestimonial, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="image" className="form-label">Image URL *</label>
                          <input
                            type="url"
                            className="form-control"
                            id="image"
                            value={newTestimonial.image}
                            onChange={(e) => setNewTestimonial({...newTestimonial, image: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="rating" className="form-label">Rating *</label>
                          <select
                            className="form-select"
                            id="rating"
                            value={newTestimonial.rating}
                            onChange={(e) => setNewTestimonial({...newTestimonial, rating: parseInt(e.target.value)})}
                            required
                          >
                            <option value={5}>5 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={3}>3 Stars</option>
                            <option value={2}>2 Stars</option>
                            <option value={1}>1 Star</option>
                          </select>
                        </div>
                        {newTestimonial.image && (
                          <div className="mb-3">
                            <label className="form-label">Preview</label>
                            <div>
                              <img
                                src={newTestimonial.image}
                                alt="Preview"
                                className="rounded-circle"
                                width="80"
                                height="80"
                                style={{ objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="quote" className="form-label">Testimonial Quote *</label>
                      <textarea
                        className="form-control"
                        id="quote"
                        rows="4"
                        value={newTestimonial.quote}
                        onChange={(e) => setNewTestimonial({...newTestimonial, quote: e.target.value})}
                        maxLength="500"
                        required
                      ></textarea>
                      <div className="form-text">{newTestimonial.quote.length}/500 characters</div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      <i className="fas fa-plus me-2"></i>Add Testimonial
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageTestimonials;
