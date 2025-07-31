import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div className="footer-brand">
            <h2>Enjoy<span>Drive</span></h2>
            <p>Premium car rental services for those who appreciate luxury and performance.</p>
          </div>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#collection">Our Collection</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <p><i className="fas fa-map-marker-alt"></i> Benz Circle, Vijayawada</p>
            <p><i className="fas fa-phone"></i> +91 0123456789</p>
            <p><i className="fas fa-envelope"></i> info@enjoydrive.com</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Enjoy<span>Drive</span>. All Rights Reserved.</p>
      </div>
    </div>

    <style jsx>{`
      .footer {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
        color: white;
        padding: 3rem 0 1rem;
        margin-top: 3rem;
        position: relative;
        overflow: hidden;
      }

      .footer::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
        pointer-events: none;
      }

      .footer-brand h2 {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: white;
      }

      .footer-brand span {
        color: #007bff;
      }

      .footer-brand p {
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }

      .social-links {
        display: flex;
        gap: 1rem;
      }

      .social-link {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .social-link:hover {
        background: #007bff;
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
      }

      .footer h4 {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        color: white;
        position: relative;
      }

      .footer h4::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 30px;
        height: 2px;
        background: #007bff;
      }

      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .footer-links li {
        margin-bottom: 0.8rem;
      }

      .footer-links a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: all 0.3s ease;
        position: relative;
      }

      .footer-links a:hover {
        color: #007bff;
        padding-left: 5px;
      }

      .contact-info p {
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .contact-info i {
        color: #007bff;
        width: 16px;
      }

      .footer-bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        margin-top: 2rem;
        padding-top: 1.5rem;
        text-align: center;
      }

      .footer-bottom p {
        margin: 0;
        color: rgba(255, 255, 255, 0.7);
      }

      .footer-bottom span {
        color: #007bff;
      }

      @media (max-width: 768px) {
        .footer {
          padding: 2rem 0 1rem;
        }

        .footer-brand h2 {
          font-size: 1.8rem;
        }

        .social-links {
          justify-content: center;
          margin-top: 1rem;
        }

        .footer h4 {
          text-align: center;
        }

        .footer h4::after {
          left: 50%;
          transform: translateX(-50%);
        }
      }
    `}</style>
  </footer>
);

export default Footer;
