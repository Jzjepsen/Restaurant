import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Overview from './Overview';
import { useMenu } from '../../../services/MenuContext';

jest.mock('../../../services/MenuContext', () => ({
  useMenu: jest.fn(),
}));

const mockMenuItems = [
  { id: '1', name: 'Pizza', soldOut: false },
  { id: '2', name: 'Pasta', soldOut: false }, // Initially available
];

describe('Overview Component', () => {
  let mockToggleSoldOut;

  beforeEach(() => {
    mockToggleSoldOut = jest.fn((id) => {
      const item = mockMenuItems.find(item => item.id === id);
      if (item) {
        item.soldOut = !item.soldOut;
      }
    });

    useMenu.mockReturnValue({
      menuItems: mockMenuItems,
      toggleSoldOut: mockToggleSoldOut,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Overview component', () => {
    render(<Overview />);
    expect(screen.getByText('Kitchen Overview')).toBeInTheDocument();
    expect(screen.getByText('This is the Kitchen Overview page.')).toBeInTheDocument();
  });

  test('renders menu items correctly', () => {
    render(<Overview />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
  });

  test('shows sold out status correctly', async () => {
    render(<Overview />);
    
    // Simulate toggle sold out for "Pasta"
    const toggleButton = screen.getAllByText('Toggle Sold Out')[1]; // Assuming Pasta is the second item

    fireEvent.click(toggleButton);

    // Manually updating the mock state to reflect the change
    mockMenuItems[1].soldOut = true;

    // Re-rendering the component to apply state change
    render(<Overview />);

    // Check for the Sold Out text
    await waitFor(() => {
      expect(screen.getByText('Sold Out')).toBeInTheDocument();
    });

    // Ensuring the correct element is updated
    const pastaItem = screen.getByText('Pasta').closest('.menu-item');
    expect(pastaItem).toHaveTextContent('Sold Out');
  });
});
