import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
// OrderContext.js
const dummyOrderItems = [
  { id: 1, status: 'new order', menuItem: { name: 'Pizza Margherita', price: 10 }, quantity: 2, comment: 'Extra cheese' },
  { id: 2, status: 'preparing', menuItem: { name: 'Spaghetti Bolognese', price: 8 }, quantity: 1, comment: 'No onions' },
  { id: 3, status: 'new order', menuItem: { name: 'Tiramisu', price: 5 }, quantity: 3, comment: 'Extra sugar' },
  { id: 4, status: 'preparing', menuItem: { name: 'Fettuccine Alfredo', price: 12 }, quantity: 4, comment: 'Extra garlic' },
  { id: 5, status: 'done', menuItem: { name: 'Chiops Alfredo', price: 6 }, quantity: 3, comment: 'Extra garlic' },

];

  const [currentOrder, setCurrentOrder] = useState([]);
  const [orderItems, setOrderItems] = useState(dummyOrderItems);

  const updateOrderStatus = (id, newStatus) => {
    console.log('Updating status for item with id:', id, 'to:', newStatus);
    setOrderItems((prevItems) => 
      prevItems.map(item => item.id === id? {...item, status: newStatus} : item)
    );
  };
  const addOrderItem = (item) => {
    setOrderItems((prevItems) => [...prevItems, {...item, comment: '' }]); // Initialize comment as empty string
  };

  return (
    <OrderContext.Provider value={{ currentOrder, setCurrentOrder, orderItems, addOrderItem, updateOrderStatus  }}>
      {children}
    </OrderContext.Provider>
  );
};
