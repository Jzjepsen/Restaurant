import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { MenuProvider, useMenu } from './MenuContext';

describe('MenuContext', () => {
    test('provides menu items and toggleSoldOut function', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([
                    { id: 1, name: 'Pizza Margherita', price: 10, TimeToCook: '20 minutes', isSoldOut: true },
                    { id: 2, name: 'Spaghetti Bolognese', price: 8, TimeToCook: '30 minutes', isSoldOut: true }
                ]),
                ok: true,
            })
        );

        const wrapper = ({ children }) => <MenuProvider>{children}</MenuProvider>;
        const { result, waitForNextUpdate } = renderHook(() => useMenu(), { wrapper });

        await waitForNextUpdate();

        expect(result.current.menuItems).toEqual([
            { id: 1, name: 'Pizza Margherita', price: 10, TimeToCook: '20 minutes', isSoldOut: true },
            { id: 2, name: 'Spaghetti Bolognese', price: 8, TimeToCook: '30 minutes', isSoldOut: true }
        ]);

        act(() => {
            result.current.toggleSoldOut(0);
        });

        expect(result.current.menuItems[0].isSoldOut).toBe(false);
    });

    test('handles fetch error', async () => {
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('fetch error'))
        );

        const wrapper = ({ children }) => <MenuProvider>{children}</MenuProvider>;
        const { result, waitForNextUpdate } = renderHook(() => useMenu(), { wrapper });

        await waitForNextUpdate();

        expect(result.current.menuItems).toEqual([
            { id: 1, name: 'Pizza Margherita', price: 10, TimeToCook: '20 minutes', isSoldOut: true },
            { id: 2, name: 'Spaghetti Bolognese', price: 8, TimeToCook: '30 minutes', isSoldOut: true },
            { id: 3, name: 'Chicken Parmesan', price: 12, TimeToCook: '25 minutes', isSoldOut: false },
            { id: 4, name: 'Garlic Bread', price: 5, TimeToCook: '10 minutes', isSoldOut: false },
            { id: 5, name: 'Tiramisu', price: 6, TimeToCook: '1 hour', isSoldOut: false }
        ]);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe('fetch error');
    });
});
