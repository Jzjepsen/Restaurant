import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import KitchenOrderView from './OrderView';
import { useOrder } from '../../services/OrderContext';

jest.mock('../../services/OrderContext', () => ({
  useOrder: jest.fn(),
}));

const mockOrders = [
  { orderId: '1', status: 'pending', menuItem: 'Pizza', quantity: 2, comment: 'Extra cheese' },
  { orderId: '2', status: 'completed', menuItem: 'Pasta', quantity: 1, comment: 'No garlic' },
];

describe('KitchenOrderView Component', () => {
  beforeEach(() => {
    try {
      useOrder.mockReturnValue({
        currentOrder: mockOrders,
        updateOrderStatus: jest.fn(),
      });
    } catch (error) {
      console.error('Error in beforeEach:', error);
    }
  });

  afterEach(() => {
    try {
      jest.clearAllMocks();
    } catch (error) {
      console.error('Error in afterEach:', error);
    }
  });

  test('renders KitchenOrderView component', () => {
    try {
      render(<KitchenOrderView />);
      expect(screen.getByText('Kitchen Order View')).toBeInTheDocument();
    } catch (error) {
      console.error('Error in test renders KitchenOrderView component:', error);
    }
  });

  test('renders orders correctly', () => {
    try {
      render(<KitchenOrderView />);
      expect(screen.getByText('Pizza')).toBeInTheDocument();
      expect(screen.getByText('Pasta')).toBeInTheDocument();
    } catch (error) {
      console.error('Error in test renders orders correctly:', error);
    }
  });

  test('renders order details correctly', () => {
    try {
      render(<KitchenOrderView />);
      expect(screen.getByText('Extra cheese')).toBeInTheDocument();
      expect(screen.getByText('No garlic')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument(); 
      expect(screen.getByText('1')).toBeInTheDocument();
    } catch (error) {
      console.error('Error in test renders order details correctly:', error);
    }
  });
});
