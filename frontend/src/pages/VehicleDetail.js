import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVehicleById } from '../services/vehicleService';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBookNow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    navigate(`/book/${id}`);
  };

  useEffect(() => {
    // Fetch vehicle from backend API
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const vehicleData = await getVehicleById(id);
        console.log('Fetched vehicle from API:', vehicleData);
        setVehicle(vehicleData);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
        setVehicle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Vehicle Not Found</h2>
          <p>The vehicle you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="card-img-top"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="h3 mb-2">{vehicle.name}</h1>
                  {vehicle.type && (
                    <span className={`badge ${vehicle.type === 'Bike' ? 'bg-info' : 'bg-secondary'} mb-2`}>
                      {vehicle.type}
                    </span>
                  )}
                </div>
                <div className="text-end">
                  <h4 className="text-primary mb-0">${vehicle.pricePerDay}<small className="text-muted">/day</small></h4>
                  <small className="text-muted">Year: {vehicle.year}</small>
                </div>
              </div>

              <p className="text-muted mb-4">{vehicle.description}</p>

              {/* Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <div className="mb-4">
                  <h5>Features</h5>
                  <div className="row">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="col-md-6 mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {vehicle.specifications && (
                <div className="mb-4">
                  <h5>Specifications</h5>
                  <div className="row">
                    {Object.entries(vehicle.specifications).map(([key, value]) => (
                      <div key={key} className="col-md-6 mb-2">
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h5 className="card-title">Book This Vehicle</h5>
              
              <div className="mb-4">
                <h4 className="text-primary">${vehicle.pricePerDay}<small className="text-muted">/day</small></h4>
              </div>

              <button
                className="btn btn-primary w-100 mb-3"
                disabled={vehicle.status !== 'available'}
                onClick={handleBookNow}
              >
                <i className="fas fa-car me-2"></i>
                {vehicle.status === 'available' ? 'Book Now' : 'Not Available'}
              </button>

              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate('/')}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Vehicles
              </button>

              <hr />

              <div className="text-center">
                <small className="text-muted">
                  Status: <span className={`badge ${vehicle.status === 'available' ? 'bg-success' : 'bg-danger'}`}>
                    {vehicle.status === 'available' ? 'Available' : 'Not Available'}
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
