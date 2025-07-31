import React from 'react';

const Contact = () => (
  <section id="contact" className="contact py-5" style={{ backgroundColor: '#f8f9fa' }}>
    <div className="container">
      <div className="section-header text-center mb-5">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-subtitle">Get in touch for bookings and inquiries</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="contact-details">
              <h3>Visit Us</h3>
              <p>EnjoyDrive</p>
              <p>Benz Circle, Vijayawada</p>
              <p>Andhra Pradesh, 522302</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div className="contact-details">
              <h3>Call Us</h3>
              <p>+91 0123456789</p>
              <p>Mon-Sat: 9:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="contact-details">
              <h3>Email Us</h3>
              <p>info@enjoydrive.com</p>
              <p>support@enjoydrive.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      .section-title {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #333;
      }

      .section-subtitle {
        font-size: 1.1rem;
        color: #666;
        margin-bottom: 0;
      }

      .contact-card {
        background: white;
        border-radius: 15px;
        padding: 2.5rem 2rem;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        height: 100%;
        border: 1px solid rgba(0,0,0,0.05);
        position: relative;
        overflow: hidden;
      }

      .contact-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #007bff, #0056b3);
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }

      .contact-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 35px rgba(0,0,0,0.15);
      }

      .contact-card:hover::before {
        transform: scaleX(1);
      }

      .contact-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 1.5rem;
        background: linear-gradient(135deg, #007bff, #0056b3);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2rem;
        box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
      }

      .contact-details h3 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #333;
      }

      .contact-details p {
        margin-bottom: 0.5rem;
        color: #666;
        line-height: 1.6;
      }

      .contact-details p:last-child {
        margin-bottom: 0;
      }

      @media (max-width: 768px) {
        .section-title {
          font-size: 2rem;
        }

        .contact-card {
          padding: 2rem 1.5rem;
        }

        .contact-icon {
          width: 70px;
          height: 70px;
          font-size: 1.8rem;
        }
      }
    `}</style>
  </section>
);

export default Contact;
