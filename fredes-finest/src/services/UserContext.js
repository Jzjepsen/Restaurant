import React, { createContext, useState, useContext } from 'react';

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
      const data = await response.json();
      if (response.ok) {
        setUser({ role: data.role }); // Store the user's role
        console.log('Logged in as:', username);
        console.log('User role set to:', data);
      } else {
        throw new Error(data.message);
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
