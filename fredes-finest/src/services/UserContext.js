import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ role: 'kitchen' }); //default to kitchen

  // dummy login method, serving as placement for proper login. Default set to manager
  // const login = (username, password) => {
  //   setUser({ role: 'manager' }); 
  // };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

//********* LOGIN METHOD TO CONNECT WITH BACKEND */ 
//
// const login = async (username, password) => {
//     try {
//       const response = await fetch('https://api.yoursite.com/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setUser({ role: data.role }); // Store the user's role
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };
