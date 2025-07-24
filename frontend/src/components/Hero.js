import React from 'react';


import { Link } from 'react-router-dom';

const Hero = () => (
  <section id="home" className="hero py-5 bg-dark text-white" style={{ background: 'url(https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg) center/cover no-repeat, #111' }}>
    <div className="container">
      <div className="hero-content" style={{ padding: '5rem 0' }}>
        <h1 className="display-3 fw-bold mb-3">Masters in Car Rental Experience</h1>
        <p className="lead mb-4">Drive our cars and enjoy the ride and fly into your dreams.</p>
        <div className="d-flex gap-3">
          <a href="#gallery" className="btn btn-primary btn-lg px-4">VIEW OUR COLLECTION</a>
          <Link to="/login" className="btn btn-outline-light btn-lg px-4">LOGIN TO BOOK</Link>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
