import React from 'react';

const Testimonials = () => (
  <section id="testimonials" className="testimonials py-5 bg-light">
    <div className="container">
      <div className="section-header text-center mb-4">
        <h2>Client Reviews</h2>
        <p>What our customers say about their experience</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="testimonial-box card p-4 mb-4">
            <img src="https://res.cloudinary.com/dz7pl7mlf/image/upload/v1745251679/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr_ejkby9.jpg" className="testimonial-image rounded-circle mb-3" alt="James Wilson" width="80" height="80" />
            <p className="lead">"Mercedes-Benz vehicles consistently receive positive reviews, particularly for their luxury interiors, stylish designs, and advanced technology features."</p>
            <h5>- James Wilson, Business Executive</h5>
          </div>
        </div>
        <div className="col-md-6">
          <div className="testimonial-box card p-4 mb-4">
            <img src="https://res.cloudinary.com/dz7pl7mlf/image/upload/v1745251787/rsflbsvuxsexcdiw5vss.jpg" className="testimonial-image rounded-circle mb-3" alt="Michael Roberts" width="80" height="80" />
            <p className="lead">"Toyota is best car according to the budget and comfort it gives nice mileage and is fully loaded with features. Looks of the car is awesome. The pickup of the car is very nice, performance of the car is great."</p>
            <h5>- Michael Roberts, Car Enthusiast</h5>
          </div>
        </div>
        <div className="col-md-6">
          <div className="testimonial-box card p-4 mb-4">
            <img src="https://res.cloudinary.com/dz7pl7mlf/image/upload/v1745251929/yzpwprwge2msh67wmvzo.jpg" className="testimonial-image rounded-circle mb-3" alt="Sarah Chen" width="80" height="80" />
            <p className="lead">"As a car enthusiast, I was blown away by their collection. The Ferrari 488 was perfectly maintained and the team's knowledge about the vehicles is impressive. Will definitely rent again!"</p>
            <h5>- Sarah Chen, Wedding Planner</h5>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;
