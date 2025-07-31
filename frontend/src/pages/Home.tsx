import React from 'react';
import HeroBanner from '../components/HeroBanner'; // Make sure HeroBanner.tsx exports default
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import VehicleList from '../components/VehicleList';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <HeroBanner />
      <Features />
      <VehicleList />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Home;
