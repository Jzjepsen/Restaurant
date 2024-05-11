// MenuContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([
        { name: "Pizza Margherita", price: 10, TimeToCook: "20 minutes", isSoldOut: true },
        { name: "Spaghetti Bolognese", price: 8, TimeToCook: "30 minutes", isSoldOut: true },
        { name: "Chicken Parmesan", price: 12, TimeToCook: "25 minutes", isSoldOut: false },
        { name: "Garlic Bread", price: 5, TimeToCook: "10 minutes", isSoldOut: false },
        { name: "Tiramisu", price: 6, TimeToCook: "1 hour", isSoldOut: false }
    ]);    
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const toggleSoldOut = (index) => {
        setMenuItems(menuItems.map((item, i) => i === index ? { ...item, isSoldOut: !item.isSoldOut } : item));
    };
    
    // Function to fetch menu items
    const fetchMenuItems = () => {
        fetch('http://localhost:5059/api/MenuItems', {
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
            setMenuItems(data);
            setIsPending(false);
            setError(null);
        })
    .catch(err => {
            setIsPending(false);
            setError(err.message);
            console.log(err);
        });
    };
    
    const addMenuItem = (newMenuItem) => {
        fetch('https://localhost:7033/api/MenuItems', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMenuItem)
        })
       .then(response => {
            if (!response.ok) throw new Error('Could not add the menu item');
            return response.json();
        })
       .then(data => {
            console.log('Menu item added:', data);
            // Update the context state here if necessary
        })
       .catch(err => {
            console.error('Error adding menu item:', err);
            // Handle error here
        });
    };


        // Call fetchMenuItems on component mount
        useEffect(() => {
            fetchMenuItems();
        }, []);

    return (
        <MenuContext.Provider value={{ menuItems, toggleSoldOut, isPending, error }}>
            {children}
        </MenuContext.Provider>
    );
};
