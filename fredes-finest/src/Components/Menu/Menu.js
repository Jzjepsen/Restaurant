import React from 'react';
import './Menu.css';

function Menu({ menuItems, showSoldOutStatus = true, onSoldOutChange }) {
    return (
        <div className="menu-container">
            {menuItems.map((item, index) => (
                <div key={index} className={`menu-item ${showSoldOutStatus? (item.isSoldOut? 'sold-out' : 'available') : ''}`}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    {showSoldOutStatus && item.isSoldOut ? <p>Sold Out</p> : <p>Available</p>}
                    {onSoldOutChange && <button onClick={() => onSoldOutChange(index)}>Toggle Sold Out</button>}
                </div>
            ))}
        </div>
    );
}


export default Menu;
