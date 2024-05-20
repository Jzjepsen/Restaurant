import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../../../services/BookingContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';

function Bookings() {
    const { bookings, isPending, error } = useBooking();
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    
    // Handle date selection
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDate = `${month} ${day} ${year}`;
        const encodedDate = encodeURIComponent(formattedDate);
        navigate(`/bookings/${encodedDate}`);

        console.log(formattedDate);
    };

    return (
        <div className="bookings-container">
            <h1>Bookings</h1>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <div className="date-picker-container">
                <h3>Select a date:</h3>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    placeholderText="Select a date"
                    dateFormat="MMMM d, yyyy"
                    className="date-picker"
                />
            </div>
        </div>
    );
}

export default Bookings;
