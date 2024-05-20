import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateOrder from './CreateOrder';
import { useMenu } from '../../../services/MenuContext';
import { useOrder } from '../../../services/OrderContext';

const mockMenuItems = [
    { id: 1, name: 'Pizza', soldOut: false },
    { id: 2, name: 'Burger', soldOut: true },
];

const mockCurrentOrder = [
    { menuItem: { id: 1, name: 'Pizza' }, quantity: 2, comment: 'Extra cheese' },
];

const mockSetCurrentOrder = jest.fn();

jest.mock('../../../services/MenuContext', () => ({
    useMenu: () => ({
        menuItems: mockMenuItems,
    }),
}));

jest.mock('../../../services/OrderContext', () => ({
    useOrder: () => ({
        currentOrder: mockCurrentOrder,
        setCurrentOrder: mockSetCurrentOrder,
    }),
}));

jest.mock('../../../Components/OrderItem/OrderItems', () => (props) => (
    <div data-testid="order-item">
        {props.item.menuItem.name} - {props.item.quantity} - {props.item.comment}
    </div>
));

jest.mock('../../../Components/Menu/Menu', () => (props) => (
    <div data-testid="menu">
        {props.menuItems.map((item) => (
            <div key={item.id}>
                {item.name} {item.soldOut ? '(Sold Out)' : ''}
                <button onClick={() => props.addToOrder(item)}>Add to Order</button>
            </div>
        ))}
    </div>
));

jest.mock('../../../Components/Dialogs/SuccesModal', () => (props) => (
    props.isOpen ? <div data-testid="success-modal">Success Modal</div> : null
));

jest.mock('../../../Components/Dialogs/FailedModal', () => (props) => (
    props.isOpen ? <div data-testid="failed-modal">Failed Modal</div> : null
));

describe('CreateOrder', () => {
    test('renders correctly with current order and menu items', () => {
        render(<CreateOrder />);

        expect(screen.getByText('Create Order')).toBeInTheDocument();
        expect(screen.getByText('Current Order')).toBeInTheDocument();
        expect(screen.getByText('Submit Order')).toBeInTheDocument();
        expect(screen.getByTestId('order-item')).toBeInTheDocument();
        expect(screen.getByTestId('menu')).toBeInTheDocument();
    });

    test('handles add to order correctly', () => {
        render(<CreateOrder />);

        fireEvent.click(screen.getByText('Add to Order', { selector: 'button' }));
        expect(mockSetCurrentOrder).toHaveBeenCalledWith([
            ...mockCurrentOrder,
            { menuItem: { id: 1, name: 'Pizza' }, quantity: 1, comment: '' },
        ]);
    });

    test('handles remove from order correctly', () => {
        render(<CreateOrder />);

        fireEvent.click(screen.getByText('Remove'));
        expect(mockSetCurrentOrder).toHaveBeenCalledWith([]);
    });

    test('handles submit order correctly', () => {
        render(<CreateOrder />);

        fireEvent.click(screen.getByText('Submit Order'));
        expect(screen.getByTestId('success-modal')).toBeInTheDocument();
    });

    test('displays failed modal when trying to add a sold-out item', () => {
        render(<CreateOrder />);

        fireEvent.click(screen.getByText('Add to Order', { selector: 'button' }));
        fireEvent.click(screen.getAllByText('Add to Order', { selector: 'button' })[1]);
        expect(screen.getByTestId('failed-modal')).toBeInTheDocument();
    });
});
