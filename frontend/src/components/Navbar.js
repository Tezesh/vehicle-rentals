import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
    <div className="container">
      <Link className="navbar-brand fw-bold fs-2" to="/">
        Enjoy<span style={{ color: '#2196f3' }}>Drive</span>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center gap-2">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><a className="nav-link" href="#gallery">Gallery</a></li>
          <li className="nav-item"><a className="nav-link" href="#testimonials">Testimonials</a></li>
          <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          <li className="nav-item"><Link to="/login" className="btn btn-primary fw-bold px-4 mx-2">LOGIN</Link></li>
          <li className="nav-item"><Link to="/admin" className="btn btn-info fw-bold px-4">ADMIN</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;