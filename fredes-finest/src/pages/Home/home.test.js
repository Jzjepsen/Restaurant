import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './home';

const mockSetUser = jest.fn();

jest.mock('../../services/UserContext', () => ({
    useUser: () => ({
        setUser: mockSetUser,
    }),
}));

describe('Home', () => {
    beforeEach(() => {
        mockSetUser.mockClear();
    });

    test('renders correctly', () => {
        render(<Home />);

        expect(screen.getByText('Homepage')).toBeInTheDocument();
        expect(screen.getByText('This works')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Select a role' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Kitchen' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Waiter' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Manager' })).toBeInTheDocument();
    });

    test('calls setUser with correct role when role is changed', () => {
        render(<Home />);

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Kitchen' } });
        expect(mockSetUser).toHaveBeenCalledWith({ role: 'Kitchen' });

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Waiter' } });
        expect(mockSetUser).toHaveBeenCalledWith({ role: 'Waiter' });

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Manager' } });
        expect(mockSetUser).toHaveBeenCalledWith({ role: 'Manager' });
    });
});
