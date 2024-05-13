import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  // Initialize currentOrder with dummy data
  // Inside the OrderProvider component in OrderContext.js
useEffect(() => {
  fetchOrders();
}, []);
  const [currentOrder, setCurrentOrder] = useState([
      { menuItem: { id: 1, name: "Pizza Margherita", price: 10, TimeToCook: "20 minutes", isSoldOut: false }, quantity: 1, comment: '' },
      { menuItem: { id: 2, name: "Spaghetti Bolognese", price: 8, TimeToCook: "30 minutes", isSoldOut: false }, quantity: 2, comment: 'Extra spicy' },
      { menuItem: { id: 3, name: "Chicken Parmesan", price: 12, TimeToCook: "25 minutes", isSoldOut: false }, quantity: 1, comment: '' }
  ]);

  const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

  // Function to fetch menu items
  const fetchOrders = () => {
    fetch('http://localhost:5059/api/Order', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
.then(response => {
        if (!response.ok) throw new Error('Could not fetch the data for that resource');
        return response.json();
    })
.then(data => {
        setCurrentOrder(data);
        setIsPending(false);
        setError(null);
    })
.catch(err => {
        setIsPending(false);
        setError(err.message);
        console.log(err);
    });
};

const addOrder = (currentOrder) => {
  fetch('https://localhost:7033/api/Order', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentOrder)
  })
 .then(response => {
      if (!response.ok) throw new Error('Could not add the menu item');
      return response.json();
  })
 .then(data => {
      console.log('Order added:', data);
      // Update the context state here if necessary
  })
 .catch(err => {
      console.error('Error adding order:', err);
      // Handle error here
  });
};

  return (
    <OrderContext.Provider value={{ currentOrder, setCurrentOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
