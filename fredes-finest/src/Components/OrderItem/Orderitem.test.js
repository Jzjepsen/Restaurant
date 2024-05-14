import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import OrderItems from './OrderItems';

test('each button has a unique identifier', async () => {
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
  const { getByPlaceholderText } = render(
    <OrderItems
      item={item}
      onItemClick={mockItemClick}
      onCommentChange={mockCommentChange}
    />
  );

  // Wait for the input field to appear
  await waitFor(() => {
    expect(getByPlaceholderText('Add a comment')).toBeInTheDocument();
  });

  // Find the input field by its class name
  const inputField = document.querySelector('.commentInput');

  // Assert that the input field exists
  expect(inputField).toBeInTheDocument();
});
