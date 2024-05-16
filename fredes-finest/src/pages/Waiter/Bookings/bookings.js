import React from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../../../services/BookingContext';

function Bookings() {
    const { bookings, isPending, error } = useBooking();

    // Get a unique list of dates
    const dates = [...new Set(bookings.map(booking => booking.date))];

    return (
        <div className="bookings-container">
            <h1>Bookings</h1>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <div className="date-list">
                {dates.map(date => (
                    <div key={date} className="date-item">
                        <Link to={`/bookings/${date}`}>{date}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bookings;
