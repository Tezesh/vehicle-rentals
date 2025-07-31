import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'Premium Fleet',
      description: 'Choose from our extensive collection of luxury and economy vehicles.',
      icon: '🚗'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your rental needs.',
      icon: '🛠️'
    },
    {
      title: 'Best Prices',
      description: 'Competitive pricing with no hidden fees or charges.',
      icon: '💰'
    },
    {
      title: 'Easy Booking',
      description: 'Simple and quick online booking process in just a few clicks.',
      icon: '📱'
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Why Choose EnjoyDrive?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .features-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 3rem;
          color: white;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: inline-block;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: white;
        }

        .feature-description {
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        @media (max-width: 768px) {
          .features-section {
            padding: 3rem 0;
          }

          .section-title {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .feature-card {
            padding: 2rem 1.5rem;
          }

          .feature-icon {
            font-size: 2.5rem;
            width: 70px;
            height: 70px;
          }
        }
      `}</style>
    </section>
  );
};

export default Features;
