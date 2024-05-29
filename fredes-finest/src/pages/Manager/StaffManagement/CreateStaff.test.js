import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateStaff from './CreateStaff';
import { useStaff } from '../../../services/StaffContext';

jest.mock('../../../services/StaffContext', () => ({
  useStaff: jest.fn(),
}));

describe('CreateStaff Component', () => {
  beforeEach(() => {
    useStaff.mockReturnValue({
      addStaffMember: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders CreateStaff component', () => {
    render(<CreateStaff />);
    expect(screen.getByText('Add a new staff member')).toBeInTheDocument();
  });

  test('allows input of staff details and submission', async () => {
    const mockAddStaffMember = jest.fn().mockResolvedValue(true);
    useStaff.mockReturnValueOnce({
      addStaffMember: mockAddStaffMember,
    });

    render(<CreateStaff />);

    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText(/First name:/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last name:/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Age:/i), { target: { value: 30 } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Staff role:/i), { target: { value: 'Waiter' } });

    fireEvent.click(screen.getByText('Add staff'));

    await waitFor(() => {
      expect(mockAddStaffMember).toHaveBeenCalledWith(
        'johndoe',
        'password',
        'John',
        'Doe',
        30,
        'john@example.com',
        'Waiter'
      );
    });
  });
});
