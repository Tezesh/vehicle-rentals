import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import VehicleDetail from './pages/VehicleDetail';
import Book from './pages/Book';
// Admin pages placeholders
const AdminCars = () => <div className="p-4"><h2>Cars Management</h2><p>Feature to manage cars will be implemented here.</p></div>;
const AdminUsers = () => <div className="p-4"><h2>Users Management</h2><p>Feature to manage users will be implemented here.</p></div>;
const AdminBookings = () => <div className="p-4"><h2>All Bookings</h2><p>Feature to view all bookings will be implemented here.</p></div>;
import './styles/global.css';


function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book" element={<Book />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/cars" element={<AdminCars />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
      </Routes>
    </>
  );
}

export default App; 