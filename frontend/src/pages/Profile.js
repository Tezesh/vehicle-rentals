import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/authService';
import BookingList from '../components/BookingList';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile().then(setUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <BookingList />
    </div>
  );
};

export default Profile; 