// MenuContext.js
import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([
        { name: 'Pizza Margherita', description: 'Classic Italian pizza with tomato sauce, mozzarella, and basil.', isSoldOut: false },
        { name: 'Spaghetti Carbonara', description: 'Spaghetti with bacon, eggs, and parmesan cheese.', isSoldOut: false },
        { name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan cheese, and Caesar dressing.', isSoldOut: true },
        // Add more menu items as needed
    ]);

    const toggleSoldOut = (index) => {
        setMenuItems(menuItems.map((item, i) => i === index ? { ...item, isSoldOut: !item.isSoldOut } : item));
    };

    return (
        <MenuContext.Provider value={{ menuItems, toggleSoldOut }}>
            {children}
        </MenuContext.Provider>
    );
};