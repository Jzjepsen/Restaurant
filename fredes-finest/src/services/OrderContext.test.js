import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { OrderProvider, useOrder } from './OrderContext';

// Mock the fetch functions
global.fetch = jest.fn();

const mockOrders = [
    { id: '1', menuItem: 'Pizza', status: 'new' },
    { id: '2', menuItem: 'Pasta', status: 'preparing' }
];

describe('OrderContext', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('fetches orders correctly', async () => {
        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockOrders });

        const { result, waitForNextUpdate } = renderHook(() => useOrder(), { wrapper: OrderProvider });

        await waitForNextUpdate();

        console.log('Current state:', result.current);

        expect(result.current.currentOrder).toEqual(mockOrders);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('handles fetch errors gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch error'));

        const { result, waitForNextUpdate } = renderHook(() => useOrder(), { wrapper: OrderProvider });

        await waitForNextUpdate();

        console.log('Current state on error:', result.current);

        expect(result.current.currentOrder).toEqual([]);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe('Fetch error');
    });
});
