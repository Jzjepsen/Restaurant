// src/Components/Dialogs/SuccesModal.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import SuccesModal from './SuccesModal';

test('renders SuccesModal with title and children', () => {
  render(
    <SuccesModal isOpen={true} onRequestClose={() => {}} title="Success Modal">
      <p>Success content</p>
    </SuccesModal>
  );
  
  expect(screen.getByText('Success Modal')).toBeInTheDocument();
  expect(screen.getByText('Success content')).toBeInTheDocument();
});

test('closes SuccesModal on button click', () => {
  const handleClose = jest.fn();
  render(
    <SuccesModal isOpen={true} onRequestClose={handleClose} title="Success Modal">
      <p>Success content</p>
    </SuccesModal>
  );

  userEvent.click(screen.getByText('x'));
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test('closes SuccesModal after 15 seconds', () => {
  jest.useFakeTimers();
  const handleClose = jest.fn();
  render(
    <SuccesModal isOpen={true} onRequestClose={handleClose} title="Success Modal">
      <p>Success content</p>
    </SuccesModal>
  );

  act(() => {
    jest.advanceTimersByTime(15000);
  });
  expect(handleClose).toHaveBeenCalledTimes(1);
  jest.useRealTimers();
});
