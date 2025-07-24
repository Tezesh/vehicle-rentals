import React from 'react';
import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => (
  <div style={{ border: '1px solid #ccc', padding: 16, width: 250 }}>
    <img src={vehicle.image} alt={vehicle.name} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
    <h3>{vehicle.name}</h3>
    <p>Type: {vehicle.type}</p>
    <p>Price per day: ${vehicle.pricePerDay}</p>
    <Link to={`/vehicles/${vehicle._id}`}>View Details</Link>
  </div>
);

export default VehicleCard; 