import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { BookingProvider, useBooking } from './BookingContext';

// Mock the fetch
global.fetch = jest.fn();

const mockBookings = [
    { bookingId: '1', guestId: '101', timeSlotId: '301' },
    { bookingId: '2', guestId: '102', timeSlotId: '302' }
];

const mockGuest = { name: 'John Doe' };
const mockTimeSlot = { tableId: 'A1', startTime: '18:00' };

describe('BookingContext', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('fetches bookings and guest details correctly', async () => {
        fetch
            .mockResolvedValueOnce({ ok: true, json: async () => mockBookings })
            .mockResolvedValueOnce({ ok: true, json: async () => mockGuest })  
            .mockResolvedValueOnce({ ok: true, json: async () => mockTimeSlot })
            .mockResolvedValueOnce({ ok: true, json: async () => mockGuest })  
            .mockResolvedValueOnce({ ok: true, json: async () => mockTimeSlot });

        const { result, waitForNextUpdate } = renderHook(() => useBooking(), { wrapper: BookingProvider });

        await waitForNextUpdate();

        expect(result.current.bookings).toEqual([
            { ...mockBookings[0], guestName: 'John Doe', tableId: 'A1', startTime: '18:00' },
            { ...mockBookings[1], guestName: 'John Doe', tableId: 'A1', startTime: '18:00' }
        ]);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('handles fetch errors gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch error'));

        const { result, waitForNextUpdate } = renderHook(() => useBooking(), { wrapper: BookingProvider });

        await waitForNextUpdate();

        expect(result.current.bookings).toEqual([]);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe('Fetch error');
    });
});
