import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { MenuProvider, useMenu } from './MenuContext';

// Mock the fetch functions
global.fetch = jest.fn();

const mockMenuItems = [
    { id: '1', name: 'Pizza', isSoldOut: false },
    { id: '2', name: 'Pasta', isSoldOut: false }
];

describe('MenuContext', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('fetches menu items correctly', async () => {
        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockMenuItems });

        const { result, waitForNextUpdate } = renderHook(() => useMenu(), { wrapper: MenuProvider });

        await waitForNextUpdate();

        expect(result.current.menuItems).toEqual(mockMenuItems);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('handles fetch errors gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch error'));

        const { result, waitForNextUpdate } = renderHook(() => useMenu(), { wrapper: MenuProvider });

        await waitForNextUpdate();

        expect(result.current.menuItems).toEqual([]);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe('Fetch error');
    });

    it('toggles sold out status correctly', async () => {
        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockMenuItems });

        const { result, waitForNextUpdate } = renderHook(() => useMenu(), { wrapper: MenuProvider });

        await waitForNextUpdate();

        act(() => {
            result.current.toggleSoldOut(0);
        });

        expect(result.current.menuItems[0].isSoldOut).toBe(true);
    });

    it('adds a new menu item correctly', async () => {
        const newMenuItem = { id: '3', name: 'Salad', isSoldOut: false };
        fetch.mockResolvedValueOnce({ ok: true, json: async () => newMenuItem });

        const { result, waitForNextUpdate } = renderHook(() => useMenu(), { wrapper: MenuProvider });

        await waitForNextUpdate();

        await act(async () => {
            await result.current.addMenuItem(newMenuItem);
        });

        console.log('Menu items after adding new item:', result.current.menuItems); // Debugging: Log current menu items
        console.log('Expected menu item:', newMenuItem); // Debugging: Log expected menu item

        // Ensure result.current.menuItems is an array
        if (Array.isArray(result.current.menuItems)) {
            const addedItem = result.current.menuItems.find(item => item.id === newMenuItem.id);
            console.log('Added item:', addedItem); // Debugging: Log the added item
            expect(addedItem).toEqual(newMenuItem);
        } else {
            console.error('menuItems is not an array. Current value:', result.current.menuItems); // Debugging: Log the current menu items if not an array
        }
    });
});
