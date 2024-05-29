// src/Components/Login/Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';
import { UserProvider } from '../../services/UserContext';

// Mock jwt-decode
jest.mock('jwt-decode', () => () => ({
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'kitchen',
}));

const mockLogin = jest.fn();

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserProvider {...providerProps}>
      {ui}
    </UserProvider>,
    renderOptions
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('renders Login component', () => {
    renderWithContext(<Login />, { providerProps: { login: mockLogin } });
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('allows user to input username and password', () => {
    renderWithContext(<Login />, { providerProps: { login: mockLogin } });
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    expect(screen.getByLabelText(/username/i)).toHaveValue('testuser');
    expect(screen.getByLabelText(/password/i)).toHaveValue('password');
  });

  test('calls login function on form submission', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ token: 'fake-jwt-token' }),
    });

    renderWithContext(<Login />, { providerProps: { login: mockLogin } });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://localhost:7033/api/Auth/Login', expect.any(Object));
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
      expect(localStorage.getItem('tokenjwt')).toBe('fake-jwt-token');
    });
  });

  test('handles login failure', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    renderWithContext(<Login />, { providerProps: { login: mockLogin } });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://localhost:7033/api/Auth/Login', expect.any(Object));
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('tokenjwt')).toBeNull();
    });
  });
});
