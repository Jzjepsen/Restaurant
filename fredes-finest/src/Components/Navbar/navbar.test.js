import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './Navbar';
import { useUser } from '../../services/UserContext';

// Mock the UserContext
jest.mock('../../services/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('Navbar component', () => {
  const renderComponent = () => render(
    <Router>
      <Navbar />
    </Router>
  );

  test('renders links for Manager', () => {
    useUser.mockReturnValue({ user: { role: 'Manager' } });

    const { getByText } = renderComponent();

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Manager Overview')).toBeInTheDocument();
    expect(getByText('Menu')).toBeInTheDocument();
    expect(getByText('Staff Management')).toBeInTheDocument();
    expect(getByText('Settings')).toBeInTheDocument();
  });

  test('renders links for Waiter', () => {
    useUser.mockReturnValue({ user: { role: 'Waiter' } });

    const { getByText } = renderComponent();

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Waiter Overview')).toBeInTheDocument();
    expect(getByText('Menu')).toBeInTheDocument();
    expect(getByText('Waiter Bookings')).toBeInTheDocument();
    expect(getByText('Waiter Orders')).toBeInTheDocument();
  });

  test('renders links for Kitchen', () => {
    useUser.mockReturnValue({ user: { role: 'Kitchen' } });

    const { getByText } = renderComponent();

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Kitchen Overview')).toBeInTheDocument();
  });

  test('renders links for Guest', () => {
    useUser.mockReturnValue({ user: { role: 'Guest' } });

    const { getByText } = renderComponent();

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Book Now')).toBeInTheDocument();
    expect(getByText('Menu')).toBeInTheDocument();
    expect(getByText('Help me!')).toBeInTheDocument();
  });

  test('renders links for unknown role', () => {
    useUser.mockReturnValue({ user: { role: 'Unknown' } });

    const { getByText } = renderComponent();

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Book Now')).toBeInTheDocument();
    expect(getByText('Menu')).toBeInTheDocument();
    expect(getByText('Help me!')).toBeInTheDocument();
  });
});
