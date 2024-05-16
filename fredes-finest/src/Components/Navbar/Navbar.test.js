import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import UserProvider from '../../services/UserContext';


// Mock the user context value
jest.mock('../../services/UserProvider', () => ({
  useUser: jest.fn(() => ({ user: { role: 'Manager' } })),
}));

test('Navbar renders links based on user role', () => {
  const { getByText } = render(
    <MemoryRouter>
      <UserProvider>
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );

  expect(getByText('Manager Overview')).toBeInTheDocument();
  expect(getByText('Configure Menu')).toBeInTheDocument();
  expect(getByText('Staff Management')).toBeInTheDocument();
  expect(getByText('Settings')).toBeInTheDocument();
});
