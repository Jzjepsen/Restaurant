import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Menu from './Menu';

describe('Menu component', () => {
  const menuItems = [
    { name: 'Item 1', description: 'Description 1', isSoldOut: false },
    { name: 'Item 2', description: 'Description 2', isSoldOut: true },
  ];

  test('renders menu items with sold out status', () => {
    const { getByText } = render(<Menu menuItems={menuItems} />);
    
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
    expect(getByText('Available')).toBeInTheDocument();

    expect(getByText('Item 2')).toBeInTheDocument();
    expect(getByText('Description 2')).toBeInTheDocument();
    expect(getByText('Sold Out')).toBeInTheDocument();
  });

  test('calls onSoldOutChange when toggle button is clicked', () => {
    const mockOnSoldOutChange = jest.fn();
    const { queryAllByRole } = render(<Menu menuItems={menuItems} onSoldOutChange={mockOnSoldOutChange} />);
    
    const toggleButtons = queryAllByRole('button', { name: 'Toggle Sold Out' });

    // Check if there's at least one toggle button
    if (toggleButtons.length > 0) {
      // Click the first toggle button found
      fireEvent.click(toggleButtons[0]);
      // Assuming you want to test with the first button only
      expect(mockOnSoldOutChange).toHaveBeenCalledWith(0); // Index of the first sold out item
    } else {
      // If no toggle buttons are found, fail the test with an appropriate message
      fail('Toggle button not found');
    }
  });

  test('renders menu items without sold out status', () => {
    const { queryAllByText } = render(<Menu menuItems={menuItems} showSoldOutStatus={false} />);
    
    expect(queryAllByText('Available')).toHaveLength(2); // Both items are available
    expect(queryAllByText('Sold Out')).toHaveLength(0);
  });
});
