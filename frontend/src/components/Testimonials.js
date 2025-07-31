import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Default testimonials as fallback
  const defaultTestimonials = [
    {
      _id: '1',
      name: 'James Wilson',
      role: 'Business Executive',
      image: 'https://res.cloudinary.com/dz7pl7mlf/image/upload/v1745251679/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr_ejkby9.jpg',
      quote: 'Mercedes-Benz vehicles consistently receive positive reviews, particularly for their luxury interiors, stylish designs, and advanced technology features.',
      rating: 5
    },
    {
      _id: '2',
      name: 'Michael Roberts',
      role: 'Car Enthusiast',
      image: 'https://res.cloudinary.com/dz7pl7mlf/image/upload/v1745251787/rsflbsvuxsexcdiw5vss.jpg',
      quote: 'Toyota is best car according to the budget and comfort it gives nice mileage and is fully loaded with features. Looks of the car is awesome. The pickup of the car is very nice, performance of the car is great.',
      rating: 4
    },
    {
      _id: '3',
      name: 'Sarah Chen',
      role: 'Wedding Planner',
      image: 'https://res.cloudinary.com/dz7pl7mlf/image/upload/v1745251929/yzpwprwge2msh67wmvzo.jpg',
      quote: 'As a car enthusiast, I was blown away by their collection. The Ferrari 488 was perfectly maintained and the team\'s knowledge about the vehicles is impressive. Will definitely rent again!',
      rating: 5
    }
  ];

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/testimonials');

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(defaultTestimonials);
        }
      } else {
        setTestimonials(defaultTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials(defaultTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}
        style={{ fontSize: '0.9rem' }}
      ></i>
    ));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <section id="testimonials" className="testimonials py-5 bg-light">
        <div className="container">
          <div className="section-header text-center mb-4">
            <h2>Client Reviews</h2>
            <p>What our customers say about their experience</p>
          </div>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="testimonials py-5">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="section-title">Client Reviews</h2>
          <p className="section-subtitle">What our customers say about their experience</p>
        </div>

        {/* Single testimonial with navigation */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="testimonial-carousel">
              {/* Navigation buttons */}
              <button
                className="nav-btn nav-btn-prev"
                onClick={prevTestimonial}
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <button
                className="nav-btn nav-btn-next"
                onClick={nextTestimonial}
              >
                <i className="fas fa-chevron-right"></i>
              </button>

              {/* Testimonial content */}
              <div className="testimonial-box">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <img
                  src={currentTestimonial.image}
                  className="testimonial-image"
                  alt={currentTestimonial.name}
                />
                <blockquote className="testimonial-quote">
                  "{currentTestimonial.quote}"
                </blockquote>
                <div className="testimonial-rating">
                  {renderStars(currentTestimonial.rating)}
                </div>
                <div className="testimonial-author">
                  <strong>{currentTestimonial.name}</strong>
                  <span>{currentTestimonial.role}</span>
                </div>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          position: relative;
          overflow: hidden;
        }

        .testimonials::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23007bff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          pointer-events: none;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
          position: relative;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 0;
        }

        .testimonial-carousel {
          position: relative;
          padding: 0 60px;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border: none;
          border-radius: 50%;
          background: #007bff;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
        }

        .nav-btn:hover {
          background: #0056b3;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
        }

        .nav-btn-prev {
          left: 0;
        }

        .nav-btn-next {
          right: 0;
        }

        .testimonial-box {
          background: white;
          border-radius: 20px;
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          position: relative;
          margin: 2rem 0;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .quote-icon {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: #007bff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .testimonial-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin: 1rem auto 2rem;
          border: 4px solid #007bff;
          box-shadow: 0 8px 25px rgba(0, 123, 255, 0.2);
        }

        .testimonial-quote {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 1.5rem;
          font-style: italic;
          position: relative;
        }

        .testimonial-rating {
          margin-bottom: 1.5rem;
        }

        .testimonial-rating .fa-star {
          font-size: 1.1rem;
          margin: 0 2px;
        }

        .testimonial-author strong {
          display: block;
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .testimonial-author span {
          color: #666;
          font-size: 0.95rem;
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: #ccc;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #007bff;
          transform: scale(1.2);
        }

        .dot:hover {
          background: #007bff;
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }

          .testimonial-carousel {
            padding: 0 40px;
          }

          .nav-btn {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .testimonial-box {
            padding: 2rem 1.5rem;
          }

          .testimonial-quote {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
