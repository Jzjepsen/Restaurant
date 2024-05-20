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
    const { getByText } = render(<Menu menuItems={menuItems} onSoldOutChange={mockOnSoldOutChange} />);
    
    const toggleButton = getByText('Toggle Sold Out');
    fireEvent.click(toggleButton);

    expect(mockOnSoldOutChange).toHaveBeenCalledWith(1); // Index of the sold out item
  });

  test('renders menu items without sold out status', () => {
    const { queryByText } = render(<Menu menuItems={menuItems} showSoldOutStatus={false} />);
    
    expect(queryByText('Available')).not.toBeInTheDocument();
    expect(queryByText('Sold Out')).not.toBeInTheDocument();
  });
});
