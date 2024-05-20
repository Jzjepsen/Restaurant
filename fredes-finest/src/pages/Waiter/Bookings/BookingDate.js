import React from 'react';
import { useParams } from 'react-router-dom';
import { useBooking } from '../../../services/BookingContext';

function BookingDate() {
    const { date } = useParams();
    const { bookings, isPending, error } = useBooking();

    // Filter bookings by the selected date
    const filteredBookings = bookings.filter(booking => booking.date === date);

    return (
        <div className="booking-date-container">
            <h1>Bookings for {date}</h1>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <div className="bookings-list">
                {filteredBookings.map((booking) => (
                    <div key={booking.bookingId} className="booking-item">
                        <h2>Name: {booking.name}</h2>
                        <p>Booking ID: {booking.bookingId}</p>
                        <p>Table ID: {booking.tableId}</p>
                        <p>Guest ID: {booking.guestId}</p>
                        <p>Time Slot ID: {booking.timeSlotId}</p>
                        <p>Date: {booking.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookingDate;
