import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      checkUserRole();
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const checkUserRole = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUserRole(userData.role);
      }
    } catch (error) {
      console.error('Error checking user role:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
  };

  const handleAdminAccess = () => {
    navigate('/admin/login');
  };

  return (
    <header className="bg-white shadow-sm" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light py-3">
          {/* Brand Logo - Matching your screenshot */}
          <Link to="/" className="navbar-brand fw-bold" style={{ fontSize: '1.8rem', color: '#333' }}>
            Enjoy<span style={{ color: '#007bff' }}>Drive</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowMobileMenu(!showMobileMenu);
            }}
            aria-expanded={showMobileMenu}
            aria-controls="navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Menu - Matching your screenshot */}
          <div className={`collapse navbar-collapse ${showMobileMenu ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link fw-semibold text-dark px-3">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="#collection"
                  className="nav-link fw-semibold text-dark px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('collection');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Collection
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#testimonials"
                  className="nav-link fw-semibold text-dark px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('testimonials');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Testimonials
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#contact"
                  className="nav-link fw-semibold text-dark px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* Auth Buttons - Matching your screenshot exactly */}
            <div className="d-flex align-items-center gap-2">
              {isLoggedIn ? (
                <>
                  {userRole === 'admin' && (
                    <button
                      onClick={() => navigate('/admin')}
                      className="btn text-white fw-semibold px-4 py-2"
                      style={{
                        backgroundColor: '#28a745',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '14px'
                      }}
                    >
                      ADMIN
                    </button>
                  )}
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-primary dropdown-toggle fw-semibold px-4 py-2"
                      type="button"
                      id="accountDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ borderRadius: '5px', fontSize: '14px' }}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDropdown(!showDropdown);
                      }}
                    >
                      ACCOUNT
                    </button>
                    <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`} aria-labelledby="accountDropdown">
                      <li>
                        <Link to="/profile" className="dropdown-item">
                          <i className="fas fa-user-circle me-2"></i>Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/bookings" className="dropdown-item">
                          <i className="fas fa-calendar-alt me-2"></i>My Bookings
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button onClick={handleLogout} className="dropdown-item text-danger">
                          <i className="fas fa-sign-out-alt me-2"></i>Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  {/* LOGIN Button - Matching your screenshot */}
                  <Link
                    to="/login"
                    className="btn text-white fw-semibold px-4 py-2 me-2"
                    style={{
                      backgroundColor: '#007bff',
                      border: 'none',
                      borderRadius: '5px',
                      fontSize: '14px',
                      textDecoration: 'none'
                    }}
                  >
                    LOGIN
                  </Link>

                  {/* Admin Button - More visible with better focus */}
                  <button
                    onClick={handleAdminAccess}
                    className="btn text-white fw-semibold px-4 py-2"
                    style={{
                      backgroundColor: '#28a745',
                      border: 'none',
                      borderRadius: '5px',
                      fontSize: '14px',
                      opacity: 0.2,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 4px rgba(40, 167, 69, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.opacity = '1';
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 8px rgba(40, 167, 69, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.opacity = '0.2';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 4px rgba(40, 167, 69, 0.3)';
                    }}
                    onFocus={(e) => {
                      e.target.style.outline = '2px solid rgba(40, 167, 69, 0.6)';
                      e.target.style.outlineOffset = '2px';
                      e.target.style.opacity = '1';
                    }}
                    onBlur={(e) => {
                      e.target.style.outline = 'none';
                      e.target.style.opacity = '0.2';
                    }}
                    title="Admin Access"
                  >
                    ADMIN
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;