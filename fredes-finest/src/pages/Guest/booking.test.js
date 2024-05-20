import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Booking from './Booking';
import '@testing-library/jest-dom/extend-expect';

test('renders Booking component and interactions', async () => {
  const { getByText, getByRole, getByPlaceholderText, queryByText, getAllByText } = render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  // Check initial state
  expect(getByText('How many are you reserving for?')).toBeInTheDocument();
  expect(getByText('1')).toBeInTheDocument();
  expect(getByRole('button', { name: '-' })).toBeDisabled();
  expect(getByRole('button', { name: '+' })).toBeEnabled();

  // Increment number of people
  fireEvent.click(getByRole('button', { name: '+' }));
  expect(getAllByText('2')[0]).toBeInTheDocument();
  expect(getByRole('button', { name: '-' })).toBeEnabled();

  // Decrement number of people
  fireEvent.click(getByRole('button', { name: '-' }));
  expect(getAllByText('1')[0]).toBeInTheDocument();
  expect(getByRole('button', { name: '-' })).toBeDisabled();

  // Select a date
  const datePicker = getByPlaceholderText('Select a date');
  await act(async () => {
    fireEvent.mouseDown(datePicker);
    fireEvent.change(datePicker, { target: { value: '2024-05-19' } });
  });
  expect(getByText('Select a timeslot:')).toBeInTheDocument();

  // Select a timeslot
  fireEvent.click(getByText('17:00'));
  expect(getByText('17:00')).toHaveClass('selected');

  // Check if the "Next" button is enabled
  const nextButton = getByText('NEXT →');
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).not.toHaveClass('disabled');

  // Test for groups larger than 4
  for (let i = 2; i <= 4; i++) {
    fireEvent.click(getByRole('button', { name: '+' }));
  }
  expect(getAllByText('4')[0]).toBeInTheDocument();
  expect(getByRole('button', { name: '+' })).toBeDisabled();

  // Check the reservation confirmation message
  expect(getByText('The reservation is not confirmed until you receive a confirmation email from us.')).toBeInTheDocument();
  expect(getByText('For groups of more than 4, please contact us on this number:')).toBeInTheDocument();
  expect(queryByText('+45 2330 5149')).toBeInTheDocument();

  // Test with the "Next" button disabled
  act(() => {
    fireEvent.click(getByText('17:00')); // Deselect the timeslot
  });
  expect(nextButton).toHaveClass('disabled');
});
