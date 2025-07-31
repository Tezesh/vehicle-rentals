import React from 'react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Premium Quality',
      description: 'All our vehicles undergo rigorous quality checks and maintenance to ensure your safety and comfort.',
      color: 'text-primary'
    },
    {
      icon: 'fas fa-clock',
      title: '24/7 Support',
      description: 'Round-the-clock customer support and roadside assistance for a worry-free rental experience.',
      color: 'text-success'
    },
    {
      icon: 'fas fa-dollar-sign',
      title: 'Best Prices',
      description: 'Competitive pricing with no hidden fees. Get the best value for your money with transparent billing.',
      color: 'text-warning'
    },
    {
      icon: 'fas fa-map-marked-alt',
      title: 'Wide Coverage',
      description: 'Extensive network of pickup and drop-off locations across the city for your convenience.',
      color: 'text-info'
    }
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-3">
              Why Choose <span className="text-primary">EnjoyDrive</span>?
            </h2>
            <p className="lead text-muted">
              Experience the difference with our premium vehicle rental service
            </p>
          </div>
        </div>
        
        <div className="row g-4">
          {reasons.map((reason, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-card">
                <div className="card-body text-center p-4">
                  <div className={`mb-3 ${reason.color}`}>
                    <i className={`${reason.icon} fa-3x`}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">{reason.title}</h5>
                  <p className="card-text text-muted">{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="row mt-5 pt-5 border-top">
          <div className="col-lg-3 col-md-6 text-center mb-4">
            <div className="stat-item">
              <h3 className="display-4 fw-bold text-primary mb-0">500+</h3>
              <p className="text-muted mb-0">Premium Vehicles</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 text-center mb-4">
            <div className="stat-item">
              <h3 className="display-4 fw-bold text-success mb-0">10K+</h3>
              <p className="text-muted mb-0">Happy Customers</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 text-center mb-4">
            <div className="stat-item">
              <h3 className="display-4 fw-bold text-warning mb-0">50+</h3>
              <p className="text-muted mb-0">City Locations</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 text-center mb-4">
            <div className="stat-item">
              <h3 className="display-4 fw-bold text-info mb-0">24/7</h3>
              <p className="text-muted mb-0">Customer Support</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-card {
          transition: all 0.3s ease;
        }
        
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        }
        
        .stat-item {
          padding: 1rem;
        }
        
        .stat-item h3 {
          font-weight: 800;
          line-height: 1;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
