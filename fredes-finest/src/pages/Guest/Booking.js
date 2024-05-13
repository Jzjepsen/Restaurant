import { Link } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';

const Booking = () => {
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeslot, setSelectedTimeslot] = useState('');

    // Increment the number of people (up to a maximum of 4)
    const incrementCount = () => {
        setNumberOfPeople(prevCount => (prevCount < 4 ? prevCount + 1 : 4));
    };

    // Decrement the number of people (down to a minimum of 1)
    const decrementCount = () => {
        setNumberOfPeople(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    };

    // Determine whether the "Next" button should be enabled
    const isNextButtonEnabled = selectedDate !== null && numberOfPeople >= 1 && selectedTimeslot !== '';

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
            <div>
                <p>The reservation is not confirmed until you receive a confirmation email from us.</p>
                <p>For groups of more than 4, please contact us on this number:</p>
                <Link to="tel:+4523305149" className="phone-number">+45 2330 5149</Link>
            </div>
            {/* Conditional rendering for the "Next" button */}
            {selectedTimeslot && (
                <Link to={isNextButtonEnabled ? "/Guest/Booking/ChooseTime" : "#"} className={`next-button ${isNextButtonEnabled ? '' : 'disabled'}`}>
                    NEXT →
                </Link>
            )}
        </div>
    );
}

export default Booking;
