// OrderItem.js
import React from 'react';
import './OrderItem.css';

function OrderItem({ item, onItemClick, onCommentChange, status = 'new order' }) {
    return (
        <div className="orderItem" onClick={() => onItemClick(item.menuItem.id)}>
            <div className="orderHeader">
                <p className="menuItemName">{item.menuItem.name}</p>
                {status && <p className="orderStatus">{status}</p>}  
            </div>
            <p className="menuItemQuantity">Amount: {item.quantity}</p>
            <div className="commentSection">
                <input 
                    type="text" 
                    className="commentInput"
                    placeholder="Add a comment"
                    value={item.comment}
                    onChange={(e) => onCommentChange(item.menuItem.id, e.target.value)}
                />
            </div>
        </div>
    );
}

export default OrderItem;
