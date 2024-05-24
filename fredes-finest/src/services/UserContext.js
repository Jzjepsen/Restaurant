import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ role: 'kitchen' }); // Default to kitchen

  const login = async (username, password) => {
    try {
      const response = await fetch('https://localhost:7033/api/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming the token is in the 'token' field of the response

        if (typeof token === 'string' && token.trim() !== '') {
          localStorage.setItem('token', token);
          localStorage.setItem('tokenjwt', token);

          const decoded = jwtDecode(token);
          const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          setUser({ role: role }); // Store the user's role
          console.log('Logged in as:', username);
          console.log('User role set to:', role);

        } else {
          throw new Error('Invalid token received');
        }
      } else {
        throw new Error('Login request failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
};
