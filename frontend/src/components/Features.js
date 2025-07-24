import React from 'react';

const Features = () => (
  <section className="features py-5 bg-light">
    <div className="container">
      <div className="row justify-content-center g-4">
        <div className="col-md-4">
          <div className="feature-box text-center p-4 bg-white rounded shadow-sm h-100">
            <i className="fas fa-car fa-3x mb-3 text-primary"></i>
            <h3 className="mb-3">Premium Vehicles</h3>
            <p>Choose from our selection of luxury and sports cars.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-box text-center p-4 bg-white rounded shadow-sm h-100">
            <i className="fas fa-money-bill-wave fa-3x mb-3 text-success"></i>
            <h3 className="mb-3">Best Rates</h3>
            <p>Competitive pricing with no hidden fees.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-box text-center p-4 bg-white rounded shadow-sm h-100">
            <i className="fas fa-headset fa-3x mb-3 text-info"></i>
            <h3 className="mb-3">24/7 Support</h3>
            <p>Our customer service team is always available.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
