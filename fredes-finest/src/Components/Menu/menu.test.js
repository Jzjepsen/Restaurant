import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Menu from './Menu';

describe('Menu component', () => {
  const menuItems = [
    { id: 1, name: 'Item 1', description: 'Description 1', isSoldOut: false },
    { id: 2, name: 'Item 2', description: 'Description 2', isSoldOut: true },
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

  test('renders menu items without sold out status', () => {
    const { queryByText, queryAllByText } = render(<Menu menuItems={menuItems} showSoldOutStatus={false} />);
    
    expect(queryByText('Sold Out')).not.toBeInTheDocument();
    expect(queryAllByText('Available')).toHaveLength(2); // Both items should be marked as available
  });

  test('calls onSoldOutChange when toggle button is clicked', () => {
    const mockOnSoldOutChange = jest.fn();
    const { getAllByText } = render(<Menu menuItems={menuItems} onSoldOutChange={mockOnSoldOutChange} />);
    
    const toggleButtons = getAllByText('Toggle Sold Out');

    fireEvent.click(toggleButtons[0]);
    expect(mockOnSoldOutChange).toHaveBeenCalledWith(0);

    fireEvent.click(toggleButtons[1]);
    expect(mockOnSoldOutChange).toHaveBeenCalledWith(1);
  });

  test('calls addToOrder when menu item is clicked', () => {
    const mockAddToOrder = jest.fn();
    const { getByText } = render(<Menu menuItems={menuItems} addToOrder={mockAddToOrder} />);

    fireEvent.click(getByText('Item 1'));
    expect(mockAddToOrder).toHaveBeenCalledWith(menuItems[0]);

    fireEvent.click(getByText('Item 2'));
    expect(mockAddToOrder).toHaveBeenCalledWith(menuItems[1]);
  });

  test('does not call onSoldOutChange when clicking item if addToOrder is provided', () => {
    const mockAddToOrder = jest.fn();
    const mockOnSoldOutChange = jest.fn();
    const { getByText } = render(<Menu menuItems={menuItems} addToOrder={mockAddToOrder} onSoldOutChange={mockOnSoldOutChange} />);

    fireEvent.click(getByText('Item 1'));
    expect(mockAddToOrder).toHaveBeenCalledWith(menuItems[0]);
    expect(mockOnSoldOutChange).not.toHaveBeenCalled();

    fireEvent.click(getByText('Item 2'));
    expect(mockAddToOrder).toHaveBeenCalledWith(menuItems[1]);
    expect(mockOnSoldOutChange).not.toHaveBeenCalled();
  });
});
