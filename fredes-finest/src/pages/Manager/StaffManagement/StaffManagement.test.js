import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StaffManagement from './StaffManagement';
import { useStaff } from '../../../services/StaffContext';

jest.mock('../../../services/StaffContext', () => ({
  useStaff: jest.fn(),
}));

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

describe('StaffManagement Component', () => {
  beforeEach(() => {
    useStaff.mockReturnValue({
      staff: mockStaff,
      getUser: jest.fn(),
      isPending: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders StaffManagement component', () => {
    render(<StaffManagement />);
    expect(screen.getByText('Staff Management')).toBeInTheDocument();
  });

  test('displays staff list and create staff form', () => {
    render(<StaffManagement />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Add a new staff member')).toBeInTheDocument();
  });

  test('displays loading state', () => {
    useStaff.mockReturnValueOnce({
      staff: [],
      getUser: jest.fn(),
      isPending: true,
      error: null,
    });
    render(<StaffManagement />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error state', () => {
    useStaff.mockReturnValueOnce({
      staff: [],
      getUser: jest.fn(),
      isPending: false,
      error: { message: 'Failed to fetch data' },
    });
    render(<StaffManagement />);
    expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
  });
});
