import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StaffList from './StaffList';

const mockStaff = [
  {
    userId: '1',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john@example.com',
    role: { roleName: 'Waiter' },
  },
  {
    userId: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    age: 25,
    email: 'jane@example.com',
    role: { roleName: 'KitchenStaff' },
  },
];

describe('StaffList Component', () => {
  test('renders staff list', () => {
    render(<StaffList staff={mockStaff} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('handles remove and edit button clicks', () => {
    render(<StaffList staff={mockStaff} />);
    fireEvent.click(screen.getAllByText('Remove')[0]);
    expect(screen.getByText('You clicked the button to remove staff member with ID: 1')).toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Edit')[0]);
    expect(screen.getByText('You clicked the button to edit staff member with ID: 1')).toBeInTheDocument();
  });
});
