import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import StaffMember from './StaffMember';

const mockStaffs = [
  {
    id: '1',
    name: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john@example.com',
  },
  {
    id: '2',
    name: 'janesmith',
    firstName: 'Jane',
    lastName: 'Smith',
    age: 25,
    email: 'jane@example.com',
  },
];

describe('StaffMember Component', () => {
  test('renders staff member details', () => {
    render(
      <Router>
        <StaffMember staffs={mockStaffs} />
      </Router>
    );

    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('janesmith')).toBeInTheDocument();

    expect(screen.getByText('First name: John')).toBeInTheDocument();
    expect(screen.getByText('Last name: Doe')).toBeInTheDocument();
    expect(screen.getByText('Age: 30')).toBeInTheDocument();
    expect(screen.getByText('E-mail: john@example.com')).toBeInTheDocument();

    expect(screen.getByText('First name: Jane')).toBeInTheDocument();
    expect(screen.getByText('Last name: Smith')).toBeInTheDocument();
    expect(screen.getByText('Age: 25')).toBeInTheDocument();
    expect(screen.getByText('E-mail: jane@example.com')).toBeInTheDocument();
  });
});
