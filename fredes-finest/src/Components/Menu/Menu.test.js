import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Menu from './Menu';

const mockAddToOrder = jest.fn();
const mockOnSoldOutChange = jest.fn();

const menuItems = [
  { id: 1, name: 'Item 1', isSoldOut: false },
  { id: 2, name: 'Item 2', isSoldOut: true },
];

const renderMenu = (props) => render(<Menu menuItems={menuItems} {...props} />);

describe('Menu Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Menu component with available items', () => {
    renderMenu({ addToOrder: mockAddToOrder, showSoldOutStatus: true });

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Sold Out')).toBeInTheDocument();
  });

  test('renders Menu component without sold out status', () => {
    renderMenu({ addToOrder: mockAddToOrder, showSoldOutStatus: false });

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.queryAllByText('Available').length).toBe(2);
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.queryByText('Sold Out')).not.toBeInTheDocument();
  });

  test('calls addToOrder when available item is clicked', () => {
    renderMenu({ addToOrder: mockAddToOrder, showSoldOutStatus: true });

    fireEvent.click(screen.getByText('Item 1'));
    expect(mockAddToOrder).toHaveBeenCalledWith(menuItems[0]);
  });

  test('calls onSoldOutChange when sold out item is clicked', () => {
    renderMenu({ onSoldOutChange: mockOnSoldOutChange, showSoldOutStatus: true });

    fireEvent.click(screen.getByText('Item 2'));
    expect(mockOnSoldOutChange).toHaveBeenCalledWith(1);
  });

  test('toggles sold out status when button is clicked', () => {
    renderMenu({ onSoldOutChange: mockOnSoldOutChange, showSoldOutStatus: true });

    fireEvent.click(screen.getAllByText('Toggle Sold Out')[0]);
    expect(mockOnSoldOutChange).toHaveBeenCalledWith(0);

    fireEvent.click(screen.getAllByText('Toggle Sold Out')[1]);
    expect(mockOnSoldOutChange).toHaveBeenCalledWith(1);
  });

  test('handles click on menu item with both addToOrder and onSoldOutChange defined', () => {
    renderMenu({ addToOrder: mockAddToOrder, onSoldOutChange: mockOnSoldOutChange, showSoldOutStatus: true });

    fireEvent.click(screen.getByText('Item 1'));
    expect(mockAddToOrder).toHaveBeenCalledWith(menuItems[0]);

    fireEvent.click(screen.getAllByText('Toggle Sold Out')[1]);
    expect(mockOnSoldOutChange).toHaveBeenCalledWith(1);
  });
});
