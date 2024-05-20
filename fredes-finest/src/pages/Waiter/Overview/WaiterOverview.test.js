import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import WaiterOverview from './Overview';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('WaiterOverview', () => {
    test('renders correctly with buttons', () => {
        render(
            <MemoryRouter>
                <WaiterOverview />
            </MemoryRouter>
        );

        expect(screen.getByText('Waiter Overview')).toBeInTheDocument();
        expect(screen.getByText('CREATE NEW ORDER')).toBeInTheDocument();
        expect(screen.getByText('RECEIVE PAYMENT')).toBeInTheDocument();
    });

    test('handles create new order button click', () => {
        render(
            <MemoryRouter>
                <WaiterOverview />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('CREATE NEW ORDER'));
        expect(mockNavigate).toHaveBeenCalledWith('/Waiter/Orders/CreateOrder');
    });

    test('handles receive payment button click', () => {
        render(
            <MemoryRouter>
                <WaiterOverview />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('RECEIVE PAYMENT'));
        expect(mockNavigate).toHaveBeenCalledWith('/Waiter/Payment/Payment');
    });
});
