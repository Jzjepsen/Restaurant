import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Bookings from './bookings';
import { useBooking } from '../../../services/BookingContext';

jest.mock('../../../services/BookingContext', () => ({
  useBooking: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Bookings Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Bookings component', () => {
    useBooking.mockReturnValue({
      bookings: [],
      isPending: false,
      error: null,
    });

    render(
      <Router>
        <Bookings />
      </Router>
    );

    expect(screen.getByText('Bookings')).toBeInTheDocument();
    expect(screen.getByText('Select a date:')).toBeInTheDocument();
  });

  test('handles date selection', async () => {
    useBooking.mockReturnValue({
      bookings: [],
      isPending: false,
      error: null,
    });

    render(
      <Router>
        <Bookings />
      </Router>
    );

    const datePicker = screen.getByPlaceholderText('Select a date');

    fireEvent.change(datePicker, { target: { value: '2024-05-27' } });
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/bookings/2024-05-27');
    });
  });

  test('shows loading state', () => {
    useBooking.mockReturnValue({
      bookings: [],
      isPending: true,
      error: null,
    });

    render(
      <Router>
        <Bookings />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows error state', () => {
    useBooking.mockReturnValue({
      bookings: [],
      isPending: false,
      error: 'Failed to load bookings',
    });

    render(
      <Router>
        <Bookings />
      </Router>
    );

    expect(screen.getByText('Failed to load bookings')).toBeInTheDocument();
  });
});
