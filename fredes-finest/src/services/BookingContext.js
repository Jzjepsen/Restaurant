import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([
        { name: "John Doe", bookingId: 1, tableId: 2, guestId: 101, timeSlotId: 301, date: "May 26 2024"}
    ]);    

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    
    // Function to fetch menu items
    const fetchBookings = () => {
        fetch('http://localhost:5059/api/Booking', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    .then(response => {
            if (!response.ok) throw new Error('Could not fetch the data for that resource');
            return response.json();
        })
    .then(data => {
            setBookings(data);
            setIsPending(false);
            setError(null);
        })
    .catch(err => {
            setIsPending(false);
            setError(err.message);
            console.log(err);
        });
    };

        // Call fetchMenuItems on component mount
        useEffect(() => {
            fetchBookings();
        }, []);

    return (
        <BookingContext.Provider value={{ bookings, isPending, error}}>
            {children}
        </BookingContext.Provider>
    );
};
