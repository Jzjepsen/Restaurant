// import React, { createContext, useContext, useState, useEffect } from 'react';

// const BookingContext = createContext();

// export const useBooking = () => useContext(BookingContext);

// export const BookingProvider = ({ children }) => {
//     const [bookings, setBookings] = useState([
//         // { bookingId: 1, tableId: 1, guestId: 101, timeSlotId: 301, date: "May 26 2024"},
//         // { bookingId: 2, tableId: 2, guestId: 102, timeSlotId: 302, date: "May 27 2024"},
//         // { bookingId: 3, tableId: 3, guestId: 103, timeSlotId: 303, date: "May 27 2024"},
//         // { bookingId: 4, tableId: 4, guestId: 104, timeSlotId: 304, date: "May 28 2024"},
//         // { bookingId: 5, tableId: 5, guestId: 105, timeSlotId: 305, date: "May 28 2024"},
//         // { bookingId: 6, tableId: 6, guestId: 106, timeSlotId: 306, date: "May 28 2024"},
//         // { bookingId: 7, tableId: 7, guestId: 107, timeSlotId: 307, date: "May 29 2024"}

//     ]);    

//     const [isPending, setIsPending] = useState(true);
//     const [error, setError] = useState(null);
    
//     // Function to fetch menu items
//     const fetchBookings = () => {
//         fetch('https://localhost:7033/api/Booking', {
//         method: 'GET',    
//         headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         })
//     .then(response => {
//             if (!response.ok) throw new Error('Could not fetch the data for that resource');
//             return response.json();
//         })
//     .then(data => {
//             setBookings(data);
//             setIsPending(false);
//             setError(null);
//         })
//     .catch(err => {
//             setIsPending(false);
//             setError(err.message);
//             console.log(err);
//         });
//     };

//         // Call fetchMenuItems on component mount
//         useEffect(() => {
//             fetchBookings();
//         }, []);

//     return (
//         <BookingContext.Provider value={{ bookings, isPending, error}}>
//             {children}
//         </BookingContext.Provider>
//     );
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    // Async function to fetch bookings and then fetch guests for each booking sequentially
    const fetchBookingsAndGuestsSequentially = async () => {
        setIsPending(true);
        setError(null);
    
        try {
            const bookingsResponse = await fetch('https://localhost:7033/api/Booking', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (!bookingsResponse.ok) throw new Error('Failed to fetch bookings');
    
            const bookings = await bookingsResponse.json();
            const bookingsWithDetails = [];
    
            for (const booking of bookings) {
                try {
                    const guestResponse = await fetch(`https://localhost:7033/api/Guest/${booking.guestId}`);
                    const guest = guestResponse.ok ? await guestResponse.json() : { name: "Guest not found" };
    
                    const timeSlotResponse = await fetch(`https://localhost:7033/api/TimeSlot/${booking.timeSlotId}`);
                    const timeSlot = timeSlotResponse.ok ? await timeSlotResponse.json() : { tableId: "No table found" };
    
                    bookingsWithDetails.push({
                        ...booking,
                        guestName: guest.name,
                        tableId: timeSlot.tableId  // Include the tableId from the TimeSlot
                    });
                } catch (error) {
                    console.error('Error fetching guest or timeSlot:', error);
                    bookingsWithDetails.push({ ...booking, guestName: "Failed to fetch guest", tableId: "Failed to fetch table" });
                }
            }
    
            setBookings(bookingsWithDetails);
            setIsPending(false);
        } catch (error) {
            console.error('Error during the booking fetch process:', error);
            setIsPending(false);
            setError(error.message);
        }
    };
    
    // Use useEffect to trigger the fetch operation when the component mounts
    useEffect(() => {
        fetchBookingsAndGuestsSequentially();
    }, []);

    return (
        <BookingContext.Provider value={{ bookings, isPending, error }}>
            {children}
        </BookingContext.Provider>
    );
};

