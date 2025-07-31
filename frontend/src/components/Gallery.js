
import React, { useEffect, useState } from 'react';
import { getVehicles } from '../services/vehicleService';

const GalleryItem = ({ image, name, price }) => (
  <div className="col-md-4">
    <div className="gallery-item card">
      <img src={image} alt={name} className="card-img-top" />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">${price.toFixed(2)}/day</p>
        <a href="#contact" className="btn btn-sm btn-primary">Book Now</a>
      </div>
    </div>
  </div>
);

const Gallery = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getVehicles()
      .then(data => {
        setVehicles(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load vehicles');
        setLoading(false);
      });
  }, []);

  return (
    <section id="gallery" className="gallery py-5">
      <div className="container">
        <div className="section-header text-center mb-4">
          <h2>Our Collection</h2>
          <p>Explore our collection of premium vehicles</p>
        </div>
        <div className="gallery-filter mb-4 d-flex justify-content-center gap-2">
          <button className="filter-btn btn btn-outline-primary active">All</button>
          <button className="filter-btn btn btn-outline-primary">Luxury</button>
          <button className="filter-btn btn btn-outline-primary">Sports</button>
          <button className="filter-btn btn btn-outline-primary">SUV</button>
          <button className="filter-btn btn btn-outline-primary">Bikes</button>
        </div>
        <div className="gallery-container row g-4 justify-content-center">
          {loading && <div className="text-center">Loading...</div>}
          {error && <div className="text-danger text-center">{error}</div>}
          {!loading && !error && vehicles.length === 0 && <div className="text-center">No vehicles found.</div>}
          {!loading && !error && vehicles.map((v, i) => (
            <GalleryItem key={v._id || i} image={v.image} name={v.name} price={v.pricePerDay || v.price} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
