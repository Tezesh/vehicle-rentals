import React, { useEffect, useState } from 'react';
import { getUserBookings } from '../services/bookingService';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getUserBookings().then(setBookings);
  }, []);

  return (
    <div>
      <h3>My Bookings</h3>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            {booking.vehicle?.name} | {booking.startDate?.slice(0,10)} to {booking.endDate?.slice(0,10)} | Status: {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList; 