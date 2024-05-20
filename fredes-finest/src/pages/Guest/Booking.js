// Booking.js

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';
import { getAvailableDates, getAvailableTimeslots, confirmBooking, AddGuest } from '../../services/TimeSlotContext';

const Booking = () => {
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const [availableTimeslots, setAvailableTimeslots] = useState([]);
    const [selectedTimeslot, setSelectedTimeslot] = useState('');
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchAvailableDates = async () => {
            const dates = await getAvailableDates(numberOfPeople);
            setAvailableDates(dates || []);
        };

        fetchAvailableDates();
    }, [numberOfPeople]);

    
    useEffect(() => {
const fetchAvailableTimeslots = async () => {
    if (selectedDate) {
        const rawTimeSlots = await getAvailableTimeslots(selectedDate.toISOString().split('T')[0]);
        console.log('Raw timeslots:', rawTimeSlots); // Log the raw timeslots received

        if (rawTimeSlots) {
            const filteredSlots = [];
            const desiredTimes = ["17.00", "18.00", "19.00", "20.00"];

            desiredTimes.forEach(time => {
                const uniqueTables = new Set();
                console.log(`Checking for time slot: ${time}`); // Log the current time being checked

                rawTimeSlots.forEach(slot => {
                    if (slot.startTime === time &&!uniqueTables.has(slot.startTime)) {
                        filteredSlots.push(slot);
                        uniqueTables.add(slot.startTime);
                    }
                });

                console.log(`Filtered slots for time ${time}:`, filteredSlots); // Log the filtered slots for each time
            });

            setAvailableTimeslots(filteredSlots);
        } else {
            console.log('No raw timeslots found'); // Log if no raw timeslots were found
            setAvailableTimeslots([]);
        }
    } else {
        console.log('No selected date'); // Log if no selected date is present
        setAvailableTimeslots([]);
    }
};

fetchAvailableTimeslots();
}, [selectedDate]);


    const incrementCount = () => {
        setNumberOfPeople(prevCount => (prevCount < 4 ? prevCount + 1 : 4));
    };

    const decrementCount = () => {
        setNumberOfPeople(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    };

    const handleConfirmOrder = async (event) => {
        event.preventDefault();
    
        try {
            // Assuming tableId is always 1 as per your example; adjust accordingly.
            const guestResponse = await AddGuest(0, name, email); // Send GuestId as 0 if it's auto-incremented
    
            if (guestResponse) {
                const formattedDate = selectedDate.toISOString().split('T')[0];
                const bookingResponse = await confirmBooking(0, 1, guestResponse.guestId, selectedTimeslot, formattedDate);
                
                if (bookingResponse) {
                    setModalMessage('Booking confirmed! You will receive a confirmation email shortly.');
                    setIsModalOpen(true);
                } else {
                    setModalMessage('Booking failed. Please try again.');
                    setIsModalOpen(true);
                }
            } else {
                setModalMessage('Failed to create guest. Please try again.');
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error during the booking process:', error);
            setModalMessage('Error occurred during booking. Please try again.');
            setIsModalOpen(true);
        }
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
    }; 

    return (
        <div className="booking-container">
            <h2>How many are you reserving for?</h2>
            <div className="counter">
                <button onClick={decrementCount} disabled={numberOfPeople === 1}>
                    -
                </button>
                <span>{numberOfPeople}</span>
                <button onClick={incrementCount} disabled={numberOfPeople === 4}>
                    +
                </button>
            </div>
            <h3>Select your reservation date:</h3>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()} // Prevent past dates
                placeholderText="Select a date"
                dateFormat="MMMM d, yyyy"
                className="date-picker"
                includeDates={availableDates.map(date => new Date(date))}
            />
            {selectedDate && (
                <>
                    <h3>Select a timeslot:</h3>
                    <div className="timeslot-buttons">
                        {availableTimeslots.map((timeslot) => (
                            <button
                                key={timeslot.timeSlotId}
                                className={`timeslot-button ${selectedTimeslot === timeslot.timeSlotId ? 'selected' : ''}`}
                                onClick={() => setSelectedTimeslot(timeslot.timeSlotId)}
                            >
                                {timeslot.startTime}
                            </button>
                        ))}
                    </div>
                </>
            )}
            {selectedTimeslot && (
                <>
                    <h3>Enter your name and your email:</h3>
                    <form onSubmit={handleConfirmOrder}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your name"
                            className="name-input"/>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="email-input"
                        />
                        <button type="submit" className="confirm-button">
                            Confirm Order
                        </button>
                    </form>
                </>
            )}
            <div>
                <p>The reservation is not confirmed until you receive a confirmation email from us.</p>
                <p>For groups of more than 4, please contact us on this number:</p>
                <Link to="tel:+4523305149" className="phone-number">+45 2330 5149</Link>
            </div>
            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>{modalMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Booking;
