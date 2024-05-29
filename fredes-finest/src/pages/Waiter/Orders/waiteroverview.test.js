import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WaiterOrderView from './OrderView';
import { useOrder } from '../../../services/OrderContext';

jest.mock('../../../services/OrderContext', () => ({
  useOrder: jest.fn(),
}));

const mockOrder = [
  { orderId: '1', status: 'New', menuItem: { menuItemId: '1', name: 'Pizza' }, quantity: 1, comment: '' },
  { orderId: '2', status: 'Preparing', menuItem: { menuItemId: '2', name: 'Pasta' }, quantity: 2, comment: 'No cheese' },
  { orderId: '3', status: 'Done', menuItem: { menuItemId: '3', name: 'Salad' }, quantity: 1, comment: '' },
];

describe('WaiterOrderView Component', () => {
  beforeEach(() => {
    useOrder.mockReturnValue({
      currentOrder: mockOrder,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders WaiterOrderView component', () => {
    render(<WaiterOrderView />);
    expect(screen.getByText('Waiter Order View')).toBeInTheDocument();
  });

  test('displays orders in the correct columns', () => {
    render(<WaiterOrderView />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
    expect(screen.getByText('Salad')).toBeInTheDocument();
    expect(screen.getByText('New Order')).toBeInTheDocument();
    expect(screen.getByText('Preparing')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  test('shows "No new orders found." if there are no new orders', () => {
    useOrder.mockReturnValue({
      currentOrder: [],
    });
    render(<WaiterOrderView />);
    expect(screen.getByText('No new orders found.')).toBeInTheDocument();
  });

  test('shows "No preparing orders found." if there are no preparing orders', () => {
    useOrder.mockReturnValue({
      currentOrder: [],
    });
    render(<WaiterOrderView />);
    expect(screen.getByText('No preparing orders found.')).toBeInTheDocument();
  });

  test('shows "No done orders found." if there are no done orders', () => {
    useOrder.mockReturnValue({
      currentOrder: [],
    });
    render(<WaiterOrderView />);
    expect(screen.getByText('No done orders found.')).toBeInTheDocument();
  });
});
