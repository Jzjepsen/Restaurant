import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { StaffProvider, useStaff } from './StaffContext';

describe('StaffContext', () => {
    test('provides staff data', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 1, name: 'John Doe' }]),
                ok: true,
            })
        );

        const wrapper = ({ children }) => <StaffProvider>{children}</StaffProvider>;
        const { result, waitForNextUpdate } = renderHook(() => useStaff(), { wrapper });

        await waitForNextUpdate();

        expect(result.current.staff).toEqual([{ id: 1, name: 'John Doe' }]);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe(null);
    });

    test('handles fetch error', async () => {
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('fetch error'))
        );

        const wrapper = ({ children }) => <StaffProvider>{children}</StaffProvider>;
        const { result, waitForNextUpdate } = renderHook(() => useStaff(), { wrapper });

        await waitForNextUpdate();

        expect(result.current.staff).toEqual([]);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe('fetch error');
    });
});
