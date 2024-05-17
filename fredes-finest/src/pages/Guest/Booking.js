// Booking.js

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';
import { getAvailableDates, getAvailableTimeslots, confirmBooking } from '../../services/TimeSlotContext';

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
                const timeslots = await getAvailableTimeslots(selectedDate.toISOString().split('T')[0]);
                setAvailableTimeslots(timeslots || []);
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
        const result = await confirmBooking(email, name, 1, selectedTimeslot, selectedDate.toISOString().split('T')[0]);

        if (result) {
            setModalMessage('Booking confirmed! You will receive a confirmation email shortly.');
        } else {
            setModalMessage('Booking failed. Please try again.');
        }
        setIsModalOpen(true);
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
                        {availableTimeslots.map((timeslot, index) => (
                            <button
                                key={index}
                                className={`timeslot-button ${selectedTimeslot === timeslot ? 'selected' : ''}`}
                                onClick={() => setSelectedTimeslot(timeslot)}
                            >
                                {timeslot}
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
