import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderView from './OrderView';
import { useOrder } from '../../../services/OrderContext';

const mockCurrentOrder = [
    { id: 1, name: 'Pizza', quantity: 2, comment: 'Extra cheese' },
    { id: 2, name: 'Burger', quantity: 1, comment: 'No onions' },
];

jest.mock('../../../services/OrderContext', () => ({
    useOrder: () => ({
        currentOrder: mockCurrentOrder,
    }),
}));

jest.mock('../../../Components/OrderItem/Order', () => () => (
    <div data-testid="order">
        Order Component
    </div>
));

describe('OrderView', () => {
    test('renders correctly with current order', () => {
        render(<OrderView />);

        expect(screen.getByText('Orders')).toBeInTheDocument();
        expect(screen.getByTestId('order')).toBeInTheDocument();
    });
});
