import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Booking.css'; // Make sure to import the CSS

const Booking = () => {
    const [numberOfPeople, setNumberOfPeople] = useState(1); // Start count from 1
  
    const incrementCount = () => {
      setNumberOfPeople(prevCount => prevCount < 4 ? prevCount + 1 : 4);
    };
  
    const decrementCount = () => {
      setNumberOfPeople(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    };

    return (
        <div className="booking-container">
            <h2>How many are you reserving for?</h2>
            <div className="counter">
                <button onClick={decrementCount} disabled={numberOfPeople === 1}>-</button>
                <span>{numberOfPeople}</span>
                <button onClick={incrementCount}>+</button>
            </div>
            <div>
                <p>The reservation is not confirmed until you receive a confirmation email from us.</p>
                <p>For groups of more than 4, please contact us on this number</p>
                <Link to="tel:+1234567890" className="phone-number">+123 456 7890</Link>
            </div>
            <Link to="/booking/date" className="next-button">NEXT →</Link>
        </div>
    );
}

export default Booking;
