// src/Components/Navbar/Navbar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { useUser } from '../../services/UserContext';
import Navbar from './Navbar';

jest.mock('../../services/UserContext', () => ({
  useUser: jest.fn(),
}));

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Navbar for Manager', () => {
    useUser.mockReturnValue({ user: { role: 'Manager' } });

    renderNavbar();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Manager Overview')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Staff Management')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('renders Navbar for Waiter', () => {
    useUser.mockReturnValue({ user: { role: 'Waiter' } });

    renderNavbar();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Waiter Overview')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Waiter Bookings')).toBeInTheDocument();
    expect(screen.getByText('Waiter Orders')).toBeInTheDocument();
  });

  test('renders Navbar for Kitchen', () => {
    useUser.mockReturnValue({ user: { role: 'Kitchen' } });

    renderNavbar();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Kitchen Overview')).toBeInTheDocument();
    expect(screen.getByText('Kitchen Orders')).toBeInTheDocument();
  });

  test('renders Navbar for default role', () => {
    useUser.mockReturnValue({ user: { role: 'Guest' } });

    renderNavbar();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Book Now')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Help me!')).toBeInTheDocument();
  });
});
