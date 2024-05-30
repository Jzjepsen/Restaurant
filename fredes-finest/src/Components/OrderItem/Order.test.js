import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Order from './Order';

const mockOrder = {
  status: 'Pending',
  totalAmount: 100,
  tableId: 1,
  orderItems: [
    { menuItemId: 'Pizza', quantity: 2, comment: 'Extra cheese' },
    { menuItemId: 'Pasta', quantity: 1, comment: 'No garlic' },
  ],
};

describe('Order Component', () => {
  test('renders Order component with order details', () => {
    render(<Order order={mockOrder} />);

    expect(screen.getByText('Status: Pending')).toBeInTheDocument();
    expect(screen.getByText('Total Amount: 100')).toBeInTheDocument();
    expect(screen.getByText('Table ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Order Item: Pizza - Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Comment: Extra cheese')).toBeInTheDocument();
    expect(screen.getByText('Order Item: Pasta - Quantity: 1')).toBeInTheDocument();
    expect(screen.getByText('Comment: No garlic')).toBeInTheDocument();
  });
});
