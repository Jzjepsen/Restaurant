import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from './home';
import { UserProvider } from '../../services/UserContext';

test("changing role updates user context", () => {
  const setUser = jest.fn(); // Mock setUser function
  const { getByLabelText } = render(
    <UserProvider value={{ setUser }}>
      <Home />
    </UserProvider>
  );

  // Find the select element by its associated label text
  const roleSelect = getByLabelText('Select a role');

  fireEvent.change(roleSelect, { target: { value: 'Manager' } });

  expect(setUser).toHaveBeenCalledWith({ role: 'Manager' });
});
