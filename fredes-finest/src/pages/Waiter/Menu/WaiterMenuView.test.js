import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WaiterMenuView from './WaiterMenuView';
import { useMenu } from '../../../services/MenuContext';

const mockMenuItems = [
    { id: 1, name: 'Pizza', soldOut: false },
    { id: 2, name: 'Burger', soldOut: true },
];

jest.mock('../../../services/MenuContext', () => ({
    useMenu: () => ({
        menuItems: mockMenuItems,
    }),
}));

jest.mock('../../../Components/Menu/Menu', () => (props) => (
    <div data-testid="menu">
        {props.menuItems.map((item) => (
            <div key={item.id}>
                {item.name} {item.soldOut ? '(Sold Out)' : ''}
            </div>
        ))}
    </div>
));

describe('WaiterMenuView', () => {
    test('renders correctly with menu items', () => {
        render(<WaiterMenuView />);

        expect(screen.getByText('Menu')).toBeInTheDocument();
        expect(screen.getByTestId('menu')).toBeInTheDocument();
        expect(screen.getByText('Pizza')).toBeInTheDocument();
        expect(screen.getByText('Burger (Sold Out)')).toBeInTheDocument();
    });
});
