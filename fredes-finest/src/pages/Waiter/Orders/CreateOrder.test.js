import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateOrder from './CreateOrder';
import { useOrder } from '../../../services/OrderContext';
import { useMenu } from '../../../services/MenuContext';

jest.mock('../../../services/OrderContext', () => ({
  useOrder: jest.fn(),
}));

jest.mock('../../../services/MenuContext', () => ({
  useMenu: jest.fn(),
}));

const mockOrder = [
  { menuItem: { id: '1', name: 'Pizza', soldOut: false }, quantity: 1, comment: '' },
  { menuItem: { id: '2', name: 'Pasta', soldOut: false }, quantity: 2, comment: 'No cheese' },
];

const mockMenuItems = [
  { id: '1', name: 'Pizza', soldOut: false },
  { id: '2', name: 'Pasta', soldOut: false },
  { id: '3', name: 'Salad', soldOut: true },
];

describe('CreateOrder Component', () => {
  beforeEach(() => {
    useOrder.mockReturnValue({
      currentOrder: mockOrder,
      setCurrentOrder: jest.fn(),
    });
    useMenu.mockReturnValue({
      menuItems: mockMenuItems,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders CreateOrder component', () => {
    render(<CreateOrder />);
    expect(screen.getByText('Create Order')).toBeInTheDocument();
  });

  test('displays current order items', () => {
    render(<CreateOrder />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
  });

  test('adds item to the order', () => {
    render(<CreateOrder />);
    const addButton = screen.getByText('Add to Order', { selector: 'button' });
    fireEvent.click(addButton);
    expect(useOrder().setCurrentOrder).toHaveBeenCalled();
  });

  test('removes item from the order', () => {
    render(<CreateOrder />);
    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);
    expect(useOrder().setCurrentOrder).toHaveBeenCalled();
  });

  test('submits the order', () => {
    render(<CreateOrder />);
    const submitButton = screen.getByText('Submit Order');
    fireEvent.click(submitButton);
    expect(screen.getByText('Order successfully submitted!')).toBeInTheDocument();
  });

  test('shows sold out status', () => {
    render(<CreateOrder />);
    const soldOutItem = screen.getByText('Salad');
    fireEvent.click(soldOutItem);
    expect(screen.getByText('Menu item sold out!')).toBeInTheDocument();
  });
});
