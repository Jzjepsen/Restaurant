// TimeSlotContext.test.js
import { getAvailableDates, getAvailableTimeslots, AddGuest, confirmBooking } from './TimeSlotContext';

global.fetch = jest.fn();

describe('TimeSlotContext', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('fetches available dates correctly', async () => {
        const mockDates = ['2024-05-26', '2024-05-27'];
        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockDates });

        const dates = await getAvailableDates(2);

        expect(dates).toEqual(mockDates);
    });

    it('fetches available timeslots correctly', async () => {
        const mockTimeslots = ['18:00', '19:00'];
        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockTimeslots });

        const timeslots = await getAvailableTimeslots('2024-05-26', 2);

        expect(timeslots).toEqual(mockTimeslots);
    });

    it('adds a guest correctly', async () => {
        const mockGuest = { GuestId: '101', name: 'John Doe', email: 'john@example.com' };
        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockGuest });

        const guest = await AddGuest('101', 'John Doe', 'john@example.com');

        expect(guest).toEqual(mockGuest);
    });

    it('confirms booking correctly', async () => {
        const mockBooking = { bookingID: '1', guestID: '101', timeSlotID: '301', date: '2024-05-26' };
        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockBooking });

        const booking = await confirmBooking('1', '101', '301', '2024-05-26');

        expect(booking).toEqual(mockBooking);
    });

    it('handles fetch errors gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch error'));

        await expect(getAvailableDates(2)).rejects.toThrow('Fetch error');
    });
});
