import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVehicles } from '../services/vehicleService';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  // Filter vehicles based on active filter
  const filterVehicles = (filter) => {
    if (filter === 'All') {
      setFilteredVehicles(vehicles);
    } else {
      const filtered = vehicles.filter(vehicle =>
        vehicle.category.toLowerCase() === filter.toLowerCase()
      );
      setFilteredVehicles(filtered);
    }
    setActiveFilter(filter);
  };

  // Handle Book Now button click
  const handleBookNow = (vehicleId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if not authenticated
        navigate('/login');
        return;
      }
      // Navigate to booking page with vehicle ID
      navigate(`/book/${vehicleId}`);
    } catch (error) {
      console.error('Error navigating to booking:', error);
      setError('Failed to navigate to booking page. Please try again.');
    }
  };

  // Handle Details button click
  const handleViewDetails = (vehicleId) => {
    navigate(`/vehicles/${vehicleId}`);
  };

  useEffect(() => {
    // Fetch vehicles from backend API
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(null);
        const vehiclesData = await getVehicles();
        console.log('Fetched vehicles from API:', vehiclesData);
        setVehicles(vehiclesData);
        setFilteredVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setError('Failed to load vehicles. Please refresh the page or try again later.');
        // Set empty array on error to prevent crashes
        setVehicles([]);
        setFilteredVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            <i className="fas fa-refresh me-2"></i>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="collection" className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <h2 className="section-title">Our Collection</h2>
        <p className="section-subtitle">Explore our collection of premium vehicles and bikes</p>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {['All', 'Luxury', 'Sports', 'SUV', 'Bike'].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => filterVehicles(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div className="row g-4">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle._id} className="col-lg-4 col-md-6">
              <div className="vehicle-card">
                <div className="vehicle-image-container">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="vehicle-image"
                  />
                  <div className="price-tag">
                    ${vehicle.pricePerDay}/day
                  </div>
                </div>
                <div className="vehicle-info">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 className="vehicle-name">{vehicle.name}</h3>
                    {vehicle.type && (
                      <span className={`badge ${vehicle.type === 'Bike' ? 'bg-info' : 'bg-secondary'}`} style={{ fontSize: '0.75rem' }}>
                        {vehicle.type}
                      </span>
                    )}
                  </div>
                  <p className="vehicle-description">{vehicle.description}</p>
                  <div style={{ marginBottom: '1rem' }}>
                    <span className={`status-${vehicle.status}`}>
                      {vehicle.status === 'available' ? 'Available' : 'Rented'}
                    </span>
                  </div>
                  <div className="vehicle-actions">
                    <button
                      className="btn btn-primary"
                      disabled={vehicle.status !== 'available'}
                      onClick={() => handleBookNow(vehicle._id)}
                    >
                      {vehicle.status === 'available' ? 'Book Now' : 'Not Available'}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleViewDetails(vehicle._id)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-5">
            <h4>No vehicles found</h4>
            <p>Try selecting a different category.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 3rem;
        }

        .filter-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid #007bff;
          background: white;
          color: #007bff;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: #007bff;
          color: white;
        }

        .vehicle-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }

        .vehicle-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .vehicle-image-container {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .vehicle-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .vehicle-card:hover .vehicle-image {
          transform: scale(1.05);
        }

        .price-tag {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #007bff;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .vehicle-info {
          padding: 1.5rem;
        }

        .vehicle-name {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .vehicle-description {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .status-available {
          color: #28a745;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .status-rented {
          color: #dc3545;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .vehicle-actions {
          display: flex;
          gap: 0.5rem;
        }

        .vehicle-actions .btn {
          flex: 1;
          padding: 0.75rem;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: #007bff;
          border: none;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #0056b3;
          transform: translateY(-1px);
        }

        .btn-primary:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid #6c757d;
          color: #6c757d;
        }

        .btn-secondary:hover {
          background: #6c757d;
          color: white;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
          
          .filter-buttons {
            gap: 0.5rem;
          }
          
          .filter-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default VehicleList;
