import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateMenu from './CreateMenu';
import { useMenu } from '../../../services/MenuContext';

const mockAddMenuItem = jest.fn().mockResolvedValue();

jest.mock('../../../services/MenuContext', () => ({
    useMenu: () => ({
        addMenuItem: mockAddMenuItem,
    }),
}));

describe('CreateMenu', () => {
    beforeEach(() => {
        mockAddMenuItem.mockClear();
    });

    test('renders correctly', () => {
        render(<CreateMenu />);

        expect(screen.getByText('Add a new dish to the menu')).toBeInTheDocument();
        expect(screen.getByText('Menu name:')).toBeInTheDocument();
        expect(screen.getByText('Menu Description:')).toBeInTheDocument();
        expect(screen.getByText('Menu price:')).toBeInTheDocument();
        expect(screen.getByText('Cooking time:')).toBeInTheDocument();
        expect(screen.getByText('Add menu')).toBeInTheDocument();
    });

    test('adds a new menu item when the form is submitted', async () => {
        render(<CreateMenu />);

        const inputs = screen.getAllByRole('textbox');
        fireEvent.change(inputs[0], { target: { value: 'Pasta' } });
        fireEvent.change(inputs[1], { target: { value: 'Delicious pasta with tomato sauce' } });
        fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '12.5' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: '20' } });

        fireEvent.click(screen.getByText('Add menu'));

        expect(mockAddMenuItem).toHaveBeenCalledWith({
            name: 'Pasta',
            description: 'Delicious pasta with tomato sauce',
            price: '12.5',
            timeToCook: '20',
            isSoldOut: false,
        });

        expect(await screen.findByText('Adding menu...')).toBeInTheDocument();
    });
});
