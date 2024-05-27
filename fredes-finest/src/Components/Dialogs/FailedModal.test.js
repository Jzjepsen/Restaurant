// src/Components/Dialogs/FailedModal.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import FailedModal from './FailedModal';

test('renders FailedModal with title and children', () => {
  render(
    <FailedModal isOpen={true} onRequestClose={() => {}} title="Failed Modal">
      <p>Failure content</p>
    </FailedModal>
  );
  
  expect(screen.getByText('Failed Modal')).toBeInTheDocument();
  expect(screen.getByText('Failure content')).toBeInTheDocument();
});

test('closes FailedModal on button click', () => {
  const handleClose = jest.fn();
  render(
    <FailedModal isOpen={true} onRequestClose={handleClose} title="Failed Modal">
      <p>Failure content</p>
    </FailedModal>
  );

  userEvent.click(screen.getByText('x'));
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test('closes FailedModal after 15 seconds', () => {
  jest.useFakeTimers();
  const handleClose = jest.fn();
  render(
    <FailedModal isOpen={true} onRequestClose={handleClose} title="Failed Modal">
      <p>Failure content</p>
    </FailedModal>
  );

  jest.advanceTimersByTime(15000);
  expect(handleClose).toHaveBeenCalledTimes(1);
  jest.useRealTimers();
});
