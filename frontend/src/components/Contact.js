import React from 'react';

const Contact = () => (
  <section id="contact" className="contact py-5">
    <div className="container">
      <div className="section-header text-center mb-4">
        <h2>Contact Us</h2>
        <p>For bookings and inquiries</p>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-md-4">
          <div className="contact-card card p-4 mb-4 text-center">
            <div className="contact-icon mb-2">
              <i className="fas fa-map-marker-alt fa-2x text-primary"></i>
            </div>
            <div className="contact-details">
              <h3>Visit Us</h3>
              <p>EnjoyDrive</p>
              <p>Benz Circle, Vijayawada</p>
              <p>Andhra Pradesh, 522302</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-card card p-4 mb-4 text-center">
            <div className="contact-icon mb-2">
              <i className="fas fa-phone-alt fa-2x text-success"></i>
            </div>
            <div className="contact-details">
              <h3>Call Us</h3>
              <p>+91 0123456789</p>
              <p>Mon-Sat: 9:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-card card p-4 mb-4 text-center">
            <div className="contact-icon mb-2">
              <i className="fas fa-envelope fa-2x text-info"></i>
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
  </section>
);

export default Contact;
