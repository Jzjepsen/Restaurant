import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import OrderItems from './OrderItem';

test('each button has a unique identifier', () => {
  // Define test item
  const item = {
    menuItem: {
      id: 1, // Unique ID for the menu item
      name: 'Test Item'
    },
    quantity: 2,
    comment: '',
  };

  // Mock event handlers
  const mockItemClick = jest.fn();
  const mockCommentChange = jest.fn();

  // Render the component
  const { getByText } = render(
    <OrderItems
      item={item}
      onItemClick={mockItemClick}
      onCommentChange={mockCommentChange}
    />
  );

  // Find the button by its text content
  const button = getByText('Add a comment');

  // Assert that the button has a unique identifier
  expect(button.id).toMatch(/^commentInput-\d+$/);
});
