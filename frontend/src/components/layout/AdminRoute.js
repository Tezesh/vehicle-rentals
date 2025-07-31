import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Try to decode the token to check role
        const payload = JSON.parse(atob(token.split('.')[1]));

        // Make API call to verify admin status
        const response = await fetch('http://localhost:5000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const user = await response.json();
          setIsAdmin(user.role === 'admin');
        } else {
          console.error('Failed to verify admin status:', response.status, response.statusText);
          setIsAdmin(false);
          // Clear invalid token
          if (response.status === 401) {
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        // Clear potentially corrupted token
        localStorage.removeItem('token');
      }

      setLoading(false);
    };

    checkAdminStatus();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
