import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { StaffProvider, useStaff } from './StaffContext';

global.fetch = jest.fn();

const mockStaff = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' }
];

describe('StaffContext', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('fetches staff members correctly', async () => {
        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockStaff });

        const { result, waitForNextUpdate } = renderHook(() => useStaff(), { wrapper: StaffProvider });

        console.log('Before waitForNextUpdate');
        await act(async () => {
            await waitForNextUpdate();
        });
        console.log('After waitForNextUpdate');

        console.log('Current state:', result.current);

        expect(result.current.staff).toEqual(mockStaff);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('handles fetch errors gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch error'));

        const { result, waitForNextUpdate } = renderHook(() => useStaff(), { wrapper: StaffProvider });

        console.log('Before waitForNextUpdate (error case)');
        await act(async () => {
            await waitForNextUpdate();
        });
        console.log('After waitForNextUpdate (error case)');

        console.log('Current state on error:', result.current);

        expect(result.current.staff).toEqual([]);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe('Fetch error');
    });
});
