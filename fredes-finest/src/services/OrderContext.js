import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    useEffect(() => {
        fetchOrders();
    }, []);

    const [currentOrder, setCurrentOrder] = useState();

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

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
        fetch('http://localhost:5059/api/Order', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentOrder)
        })
        .then(response => {
            if (!response.ok) throw new Error('Could not add the order');
            return response.json();
        })
        .then(data => {
            console.log('Order added:', data);
        })
        .catch(err => {
            console.error('Error adding order:', err);
        });
    };

    return (
        <OrderContext.Provider value={{ currentOrder, setCurrentOrder, isPending, error, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
