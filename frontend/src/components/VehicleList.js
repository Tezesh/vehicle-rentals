import React, { useEffect, useState } from 'react';
import { getVehicles } from '../services/vehicleService';
import VehicleCard from './VehicleCard';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getVehicles().then(setVehicles);
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle._id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleList; 