import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { OrderProvider, useOrder } from './OrderContext';

describe('OrderContext', () => {
    test('should provide the current order and setCurrentOrder function', () => {
        const wrapper = ({ children }) => <OrderProvider>{children}</OrderProvider>;
        const { result } = renderHook(() => useOrder(), { wrapper });

        expect(result.current.currentOrder).toEqual([]);
        act(() => {
            result.current.setCurrentOrder([{ id: 1, name: 'Pizza', quantity: 2 }]);
        });
        expect(result.current.currentOrder).toEqual([{ id: 1, name: 'Pizza', quantity: 2 }]);
    });
});
