import React from 'react';
import { useBooking } from '../../../services/BookingContext';

function Bookings() {
    const { bookings, isPending, error } = useBooking();

    return (
        <div className="bookings-container">
            <h1>Bookings</h1>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <div className="bookings-list">
                {bookings.map((booking) => (
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

export default Bookings;
