import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Navbar from './Navbar';
import { UserProvider } from '../../services/UserContext';

describe('Navbar component', () => {
  test('renders navbar links for Manager role', async () => {
    render(
      <Router>
        <UserProvider value={{ user: { role: 'Manager' } }}>
          <Navbar />
        </UserProvider>
      </Router>
    );

    expect(await screen.findByText('Manager Overview')).toBeInTheDocument();
    expect(screen.getByText('Configure Menu')).toBeInTheDocument();
    expect(screen.getByText('Staff Management')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('renders navbar links for Waiter role', async () => {
    render(
      <Router>
        <UserProvider value={{ user: { role: 'Waiter' } }}>
          <Navbar />
        </UserProvider>
      </Router>
    );

    expect(await screen.findByText('Waiter Overview')).toBeInTheDocument();
    expect(screen.getByText('Waiter Menu')).toBeInTheDocument();
    expect(screen.getByText('Waiter Bookings')).toBeInTheDocument();
    expect(screen.getByText('Waiter Orders')).toBeInTheDocument();
  });

  test('renders navbar link for Kitchen role', async () => {
    render(
      <Router>
        <UserProvider value={{ user: { role: 'Kitchen' } }}>
          <Navbar />
        </UserProvider>
      </Router>
    );

    expect(await screen.findByText('Kitchen Overview')).toBeInTheDocument();
  });

  test('does not render any links for unknown role', async () => {
    render(
      <Router>
        <UserProvider value={{ user: { role: 'Unknown' } }}>
          <Navbar />
        </UserProvider>
      </Router>
    );

    expect(await screen.queryByText('Manager Overview')).not.toBeInTheDocument();
    expect(await screen.queryByText('Configure Menu')).not.toBeInTheDocument();
    expect(await screen.queryByText('Staff Management')).not.toBeInTheDocument();
    expect(await screen.queryByText('Settings')).not.toBeInTheDocument();
    expect(await screen.queryByText('Waiter Overview')).not.toBeInTheDocument();
    expect(await screen.queryByText('Waiter Menu')).not.toBeInTheDocument();
    expect(await screen.queryByText('Waiter Bookings')).not.toBeInTheDocument();
    expect(await screen.queryByText('Waiter Orders')).not.toBeInTheDocument();
    expect(await screen.queryByText('Kitchen Overview')).not.toBeInTheDocument();
  });
});
