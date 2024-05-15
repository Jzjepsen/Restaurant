import { Link } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';

const Booking = () => {
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeslot, setSelectedTimeslot] = useState('');
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [name, setName] = useState('');

    // Increment the number of people (up to a maximum of 4)
    const incrementCount = () => {
        setNumberOfPeople(prevCount => (prevCount < 4 ? prevCount + 1 : 4));
    };

    // Decrement the number of people (down to a minimum of 1)
    const decrementCount = () => {
        setNumberOfPeople(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    };

    const generateTimeslots = () => {
        const startHour = 17; // 17:00
        const endHour = 22; // 22:00
        let timeslots = [];

        for (let hour = startHour; hour <= endHour; hour++) {
            timeslots.push(`${hour}:00`);
        }

        return timeslots;
    };

    const timeslots = generateTimeslots();

    const handleConfirmOrder = (event) => {
        event.preventDefault();
        // Add your booking confirmation logic here
        const bookingSuccess = Math.random() > 0.5; // Simulate success or failure

        if (bookingSuccess) {
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
            />
            {selectedDate && (
                <>
                    <h3>Select a timeslot:</h3>
                    <div className="timeslot-buttons">
                        {timeslots.map((timeslot, index) => (
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
                            Type="Text"
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
