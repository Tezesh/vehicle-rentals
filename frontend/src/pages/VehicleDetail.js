import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/BookingForm';

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    axios.get(`/api/vehicles/${id}`).then(res => setVehicle(res.data));
  }, [id]);

  if (!vehicle) return <div>Loading...</div>;

  return (
    <div>
      <h2>{vehicle.name}</h2>
      <img src={vehicle.image} alt={vehicle.name} style={{ width: 300 }} />
      <p>Type: {vehicle.type}</p>
      <p>Price per day: ${vehicle.pricePerDay}</p>
      <p>Description: {vehicle.description}</p>
      <BookingForm vehicleId={vehicle._id} />
    </div>
  );
};

export default VehicleDetail; 