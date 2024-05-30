import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MenuGuest from './MenuGuest';
import { useMenu } from '../../services/MenuContext';

jest.mock('../../services/MenuContext', () => ({
  useMenu: jest.fn(),
}));

describe('MenuGuest', () => {
  it('renders the menu with items', () => {
    const mockMenuItems = [
      { id: 1, name: 'Pizza', soldOut: false },
      { id: 2, name: 'Pasta', soldOut: true },
    ];
    useMenu.mockReturnValue({ menuItems: mockMenuItems });

    render(<MenuGuest />);

    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
  });
});
