// MenuContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);     
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const toggleSoldOut = (index) => {
        setMenuItems(menuItems.map((item, i) => i === index ? { ...item, isSoldOut: !item.isSoldOut } : item));
    };

    const fetchMenuItems = () => {
        fetch('https://localhost:7033/api/MenuItem', {
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
        fetch('https://localhost:7033/api/MenuItem', {
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
        })
        .catch(err => {
            console.error('Error adding menu item:', err);
        });
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    return (
        <MenuContext.Provider value={{ menuItems, toggleSoldOut, isPending, error, addMenuItem }}>
            {children}
        </MenuContext.Provider>
    );
};
