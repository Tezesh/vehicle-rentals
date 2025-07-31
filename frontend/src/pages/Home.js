import React from 'react';
import HeroBanner from '../components/HeroBanner';
import VehicleList from '../components/VehicleList';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const Home = () => (
  <div>
    <HeroBanner />
    <section id="collection">
      <VehicleList />
    </section>
    <Features />
    <section id="testimonials">
      <Testimonials />
    </section>
    <section id="contact">
      <Contact />
    </section>
  </div>
);

export default Home;