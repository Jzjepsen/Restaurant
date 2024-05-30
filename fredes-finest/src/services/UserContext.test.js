import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { UserProvider, useUser } from './UserContext';

global.fetch = jest.fn();

const mockUser = { id: '1', name: 'John Doe' };

describe('UserContext', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('fetches user details correctly', async () => {
        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockUser });

        const { result, waitForNextUpdate } = renderHook(() => useUser(), { wrapper: UserProvider });

        await act(async () => {
            try {
                await waitForNextUpdate({ timeout: 2000 });
            } catch (error) {
                console.error('Timeout error:', error);
            }
        });

        console.log('Current state after fetch:', result.current);

        expect(result.current.user).toEqual(mockUser);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('handles fetch errors gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch error'));

        const { result, waitForNextUpdate } = renderHook(() => useUser(), { wrapper: UserProvider });

        await act(async () => {
            try {
                await waitForNextUpdate({ timeout: 2000 });
            } catch (error) {
                console.error('Timeout error:', error);
            }
        });

        console.log('Current state on error:', result.current);

        expect(result.current.user).toBeNull();
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe('Fetch error');
    });
});
