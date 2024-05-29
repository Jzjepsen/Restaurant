import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Booking from './Booking';
import { BrowserRouter as Router } from 'react-router-dom';
import { getAvailableDates, getAvailableTimeslots, confirmBooking, AddGuest } from '../../services/TimeSlotContext';

jest.mock('../../services/TimeSlotContext', () => ({
  getAvailableDates: jest.fn(),
  getAvailableTimeslots: jest.fn(),
  confirmBooking: jest.fn(),
  AddGuest: jest.fn(),
}));

const setup = async () => {
  await act(async () => {
    render(
      <Router>
        <Booking />
      </Router>
    );
  });
};

describe('Booking Component', () => {
  beforeEach(() => {
    getAvailableDates.mockResolvedValue(['2024-06-01', '2024-06-02']);
    getAvailableTimeslots.mockResolvedValue([
      { timeSlotId: '1', startTime: '17:00' },
      { timeSlotId: '2', startTime: '18:00' },
    ]);
    AddGuest.mockResolvedValue({ guestId: 1 });
    confirmBooking.mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Booking component', async () => {
    await setup();
    expect(screen.getByText('How many are you reserving for?')).toBeInTheDocument();
    expect(screen.getByText('Select your reservation date:')).toBeInTheDocument();
  });

  test('increments and decrements number of people', async () => {
    await setup();
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');
    const counter = screen.getByText('1');

    fireEvent.click(incrementButton);
    expect(counter.textContent).toBe('2');

    fireEvent.click(decrementButton);
    expect(counter.textContent).toBe('1');
  });

  test('selects a date', async () => {
    await setup();
    const dateInput = screen.getByPlaceholderText('Select a date');
    await act(async () => {
      fireEvent.change(dateInput, { target: { value: '2024-06-01' } });
    });

    await waitFor(() => expect(getAvailableDates).toHaveBeenCalledTimes(1));
  });

  test('selects a timeslot', async () => {
    await setup();
    const dateInput = screen.getByPlaceholderText('Select a date');
    await act(async () => {
      fireEvent.change(dateInput, { target: { value: '2024-06-01' } });
    });

    await waitFor(() => expect(getAvailableTimeslots).toHaveBeenCalledTimes(1), { timeout: 500 });

    const timeslotButton = await screen.findByText('17:00');
    fireEvent.click(timeslotButton);

    expect(timeslotButton).toHaveClass('selected');
  });

  test('fills in name and email and submits form successfully', async () => {
    await setup();
    const dateInput = screen.getByPlaceholderText('Select a date');
    await act(async () => {
      fireEvent.change(dateInput, { target: { value: '2024-06-01' } });
    });

    await waitFor(() => expect(getAvailableTimeslots).toHaveBeenCalledTimes(1), { timeout: 500 });

    fireEvent.click(screen.getByText('17:00'));

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'john@example.com' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Confirm Order'));
    });

    await waitFor(() => expect(confirmBooking).toHaveBeenCalledTimes(1), { timeout: 500 });
    expect(screen.getByText('Booking confirmed! You will receive a confirmation email shortly.')).toBeInTheDocument();
  });

  test('handles booking failure', async () => {
    confirmBooking.mockResolvedValueOnce(false);

    await setup();
    const dateInput = screen.getByPlaceholderText('Select a date');
    await act(async () => {
      fireEvent.change(dateInput, { target: { value: '2024-06-01' } });
    });

    await waitFor(() => expect(getAvailableTimeslots).toHaveBeenCalledTimes(1), { timeout: 500 });

    fireEvent.click(screen.getByText('17:00'));

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'john@example.com' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Confirm Order'));
    });

    await waitFor(() => expect(confirmBooking).toHaveBeenCalledTimes(1), { timeout: 500 });
    expect(screen.getByText('Booking failed. Please try again.')).toBeInTheDocument();
  });

  test('closes modal when close button is clicked', async () => {
    await setup();
    const dateInput = screen.getByPlaceholderText('Select a date');
    await act(async () => {
      fireEvent.change(dateInput, { target: { value: '2024-06-01' } });
    });

    await waitFor(() => expect(getAvailableTimeslots).toHaveBeenCalledTimes(1), { timeout: 500 });

    fireEvent.click(screen.getByText('17:00'));

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'john@example.com' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Confirm Order'));
    });

    await waitFor(() => expect(confirmBooking).toHaveBeenCalledTimes(1), { timeout: 500 });

    fireEvent.click(screen.getByText('×'));

    expect(screen.queryByText('Booking confirmed! You will receive a confirmation email shortly.')).not.toBeInTheDocument();
  });
});
