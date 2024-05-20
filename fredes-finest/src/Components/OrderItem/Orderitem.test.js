import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderItems from './OrderItems';

test('renders OrderItems component with correct data and interactions', () => {
  // Define test item
  const item = {
    menuItem: {
      id: 1, // Unique ID for the menu item
      name: 'Test Item'
    },
    quantity: 2,
    comment: 'Initial comment',
  };

  // Mock event handlers
  const mockItemClick = jest.fn();
  const mockCommentChange = jest.fn();

  // Render the component with status
  const { getByText, getByPlaceholderText } = render(
    <OrderItems
      item={item}
      onItemClick={mockItemClick}
      onCommentChange={mockCommentChange}
      status="in progress"
    />
  );

  // Verify rendered content with status
  expect(getByText('Test Item')).toBeInTheDocument();
  expect(getByText('Amount: 2')).toBeInTheDocument();
  expect(getByText('in progress')).toBeInTheDocument();

  // Test clicking the order item
  fireEvent.click(getByText('Test Item'));
  expect(mockItemClick).toHaveBeenCalledWith(1);

  // Test changing the comment
  const input = getByPlaceholderText('Add a comment');
  fireEvent.change(input, { target: { value: 'New comment' } });
  expect(mockCommentChange).toHaveBeenCalledWith(1, 'New comment');
});

test('renders OrderItems component without explicit status', () => {
  // Define test item
  const item = {
    menuItem: {
      id: 2, // Unique ID for the menu item
      name: 'Another Test Item'
    },
    quantity: 3,
    comment: 'Another comment',
  };

  // Mock event handlers
  const mockItemClick = jest.fn();
  const mockCommentChange = jest.fn();

  // Render the component without status
  const { getByText, getByPlaceholderText } = render(
    <OrderItems
      item={item}
      onItemClick={mockItemClick}
      onCommentChange={mockCommentChange}
    />
  );

  // Verify rendered content without status
  expect(getByText('Another Test Item')).toBeInTheDocument();
  expect(getByText('Amount: 3')).toBeInTheDocument();
  expect(getByText('new order')).toBeInTheDocument();  // Checking the default status

  // Test clicking the order item
  fireEvent.click(getByText('Another Test Item'));
  expect(mockItemClick).toHaveBeenCalledWith(2);

  // Test changing the comment
  const input = getByPlaceholderText('Add a comment');
  fireEvent.change(input, { target: { value: 'Updated comment' } });
  expect(mockCommentChange).toHaveBeenCalledWith(2, 'Updated comment');
});
