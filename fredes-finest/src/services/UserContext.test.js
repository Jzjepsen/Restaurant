import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { UserProvider, useUser } from './UserContext';

describe('UserContext', () => {
    test('provides the user and setUser function', () => {
        const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
        const { result } = renderHook(() => useUser(), { wrapper });

        expect(result.current.user).toEqual({ role: 'kitchen' });
        act(() => {
            result.current.setUser({ role: 'manager' });
        });
        expect(result.current.user).toEqual({ role: 'manager' });
    });
});
