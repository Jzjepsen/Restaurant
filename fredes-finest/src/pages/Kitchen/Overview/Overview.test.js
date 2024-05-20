import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Overview from './Overview';
import { useMenu } from '../../../services/MenuContext';
import Menu from '../../../Components/Menu/Menu';

const mockMenuItems = [
    { id: 1, name: 'Pizza', soldOut: false },
    { id: 2, name: 'Burger', soldOut: true },
];

const mockToggleSoldOut = jest.fn();

jest.mock('../../../services/MenuContext', () => ({
    useMenu: () => ({
        menuItems: mockMenuItems,
        toggleSoldOut: mockToggleSoldOut,
    }),
}));

jest.mock('../../../Components/Menu/Menu', () => (props) => (
    <div data-testid="menu">
        {props.menuItems.map((item) => (
            <div key={item.id}>
                {item.name} {item.soldOut ? '(Sold Out)' : ''}
                <button onClick={() => props.onSoldOutChange(item.id)}>{item.soldOut ? 'Mark as Available' : 'Mark as Sold Out'}</button>
            </div>
        ))}
    </div>
));

describe('Overview', () => {
    beforeEach(() => {
        mockToggleSoldOut.mockClear();
    });

    test('renders correctly with menu items', () => {
        render(<Overview />);

        expect(screen.getByText('Kitchen Overview')).toBeInTheDocument();
        expect(screen.getByText('This is the Kitchen Overview page.')).toBeInTheDocument();
        expect(screen.getByTestId('menu')).toBeInTheDocument();
        expect(screen.getByText('Pizza')).toBeInTheDocument();
        expect(screen.getByText('Burger (Sold Out)')).toBeInTheDocument();
    });

    test('calls toggleSoldOut when sold-out status is changed', () => {
        render(<Overview />);

        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[0]);
        expect(mockToggleSoldOut).toHaveBeenCalledWith(1);

        fireEvent.click(buttons[1]);
        expect(mockToggleSoldOut).toHaveBeenCalledWith(2);
    });
});
