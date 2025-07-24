import React from 'react';

const Footer = () => (
  <footer className="footer bg-dark text-white py-4 mt-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6 mb-3 mb-md-0">
          <h2>Enjoy<span style={{ color: '#2196f3' }}>Drive</span></h2>
          <p>Premium car rental services for those who appreciate luxury and performance.</p>
          <div className="social-links">
            <a href="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white me-3"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="col-md-6 text-md-end">
          <h3>Quick Links</h3>
          <ul className="list-unstyled">
            <li><a href="#home" className="text-white">Home</a></li>
            <li><a href="#gallery" className="text-white">Our Collection</a></li>
            <li><a href="#testimonials" className="text-white">Testimonials</a></li>
            <li><a href="#contact" className="text-white">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom text-center mt-4">
        <p>&copy; 2025 Enjoy<span style={{ color: '#3498db' }}>Drive</span> All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
