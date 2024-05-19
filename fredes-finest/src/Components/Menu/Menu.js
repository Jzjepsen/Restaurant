import React from 'react';
import './Menu.css';

function Menu({ menuItems, addToOrder, onSoldOutChange, showSoldOutStatus = true }) {
    const handleClick = (item, index) => {
        if (addToOrder) {
            addToOrder(item);
        } else if (onSoldOutChange) {
            onSoldOutChange(index);
        }
    };

    return (
        <div className="menu-container">
            {menuItems.map((item, index) => (
                <div 
                    key={item.id || index} 
                    className={`menu-item ${item.isSoldOut ? 'sold-out' : 'available'}`}
                    onClick={() => handleClick(item, index)}
                >           
                    <h3>{item.name}</h3>
                    <p>{item.description}</p> {/* Display description */}
                    {showSoldOutStatus && item.isSoldOut ? <p>Sold Out</p> : <p>Available</p>}
                    {onSoldOutChange && <button onClick={() => onSoldOutChange(index)}>Toggle Sold Out</button>}
                </div>
            ))}
        </div>
    );
}

export default Menu;
