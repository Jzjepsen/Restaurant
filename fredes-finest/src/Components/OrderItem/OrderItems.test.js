// src/Components/OrderItem/OrderItems.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderItems from './OrderItems';

const mockItem = {
  menuItem: { id: '1', name: 'Burger' },
  quantity: 3,
  comment: 'Extra sauce',
};

const mockOnItemClick = jest.fn();
const mockOnCommentChange = jest.fn();

describe('OrderItems Component', () => {
  test('renders OrderItems component with item details', () => {
    render(
      <OrderItems
        item={mockItem}
        onItemClick={mockOnItemClick}
        onCommentChange={mockOnCommentChange}
        status="Pending"
      />
    );

    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.getByText('Amount: 3')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a comment').value).toBe('Extra sauce');
  });

  test('calls onItemClick when item is clicked', () => {
    render(
      <OrderItems
        item={mockItem}
        onItemClick={mockOnItemClick}
        onCommentChange={mockOnCommentChange}
      />
    );

    fireEvent.click(screen.getByText('Burger'));
    expect(mockOnItemClick).toHaveBeenCalledWith(mockItem.menuItem.id);
  });

  test('calls onCommentChange when comment is changed', () => {
    render(
      <OrderItems
        item={mockItem}
        onItemClick={mockOnItemClick}
        onCommentChange={mockOnCommentChange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Add a comment'), { target: { value: 'No onions' } });
    expect(mockOnCommentChange).toHaveBeenCalledWith(mockItem.menuItem.id, 'No onions');
  });
});
