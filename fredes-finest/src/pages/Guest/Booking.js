// Booking.js

import { Link } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';

const Booking = () => {
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);

    // Increment the number of people (up to a maximum of 4)
    const incrementCount = () => {
        setNumberOfPeople(prevCount => (prevCount < 4 ? prevCount + 1 : 4));
    };

    // Decrement the number of people (down to a minimum of 1)
    const decrementCount = () => {
        setNumberOfPeople(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    };

    // Determine whether the "Next" button should be enabled
    const isNextButtonEnabled = selectedDate !== null && numberOfPeople >= 1;

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
            <div>
                <p>The reservation is not confirmed until you receive a confirmation email from us.</p>
                <p>For groups of more than 4, please contact us on this number:</p>
                <Link to="tel:+4523305149" className="phone-number">+45 2330 5149</Link>
            </div>
            {/* Conditional rendering for the "Next" button */}
            <Link to={isNextButtonEnabled ? "/booking/date" : "#"} className={`next-button ${isNextButtonEnabled ? '' : 'disabled'}`}>
                NEXT →
            </Link>
        </div>
    );
}

export default Booking;
