import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BookingDate from './BookingDate';
import { useBooking } from '../../../services/BookingContext';

jest.mock('../../../services/BookingContext', () => ({
  useBooking: jest.fn(),
}));

const mockBookings = [
  {
    bookingId: '1',
    guestName: 'John Doe',
    tableId: 'A1',
    guestId: '101',
    startTime: '18:00',
    date: '2024-05-27',
  },
  {
    bookingId: '2',
    guestName: 'Jane Smith',
    tableId: 'A2',
    guestId: '102',
    startTime: '19:00',
    date: '2024-05-27',
  },
];

describe('BookingDate Component', () => {
  beforeEach(() => {
    useBooking.mockReturnValue({
      bookings: mockBookings,
      isPending: false,
      error: null,
    });
  });

  test('renders BookingDate component with bookings', () => {
    render(
      <MemoryRouter initialEntries={['/bookings/2024-05-27']}>
        <Routes>
          <Route path="/bookings/:date" element={<BookingDate />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Bookings for 2024-05-27')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /John Doe/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Jane Smith/i })).toBeInTheDocument();
  });

  test('shows loading state', () => {
    useBooking.mockReturnValue({
      bookings: [],
      isPending: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/bookings/2024-05-27']}>
        <Routes>
          <Route path="/bookings/:date" element={<BookingDate />} />
        </Routes>
      </MemoryRouter>
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
      <MemoryRouter initialEntries={['/bookings/2024-05-27']}>
        <Routes>
          <Route path="/bookings/:date" element={<BookingDate />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Failed to load bookings')).toBeInTheDocument();
  });
});
