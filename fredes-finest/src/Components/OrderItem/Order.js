// Order.js
import React from 'react';
import { useOrder } from '../../services/OrderContext';
import { useMenu } from '../../services/MenuContext';

const Order = () => {
    const { currentOrder } = useOrder();
    const { menuItems } = useMenu();

    const getMenuItemDetails = (menuItemId) => {
        return menuItems.find(item => item.id === menuItemId);
    };

    return (
        <div>
            {currentOrder.map((order, index) => {
                const menuItemDetails = getMenuItemDetails(order.orderItems.menuItemId);
                return (
                    <div key={index}>
                        <p>Order ID: {order.OrderId}</p>
                        <p>Table ID: {order.tableId}</p>
                        <p>Total Amount: ${order.totalAmount}</p>
                        <p>Status: {order.status}</p>
                        <p>Order Item ID: {order.orderItems.orderItemId}</p>
                        <p>Comment: {order.orderItems.comment}</p>
                        <p>Quantity: {order.orderItems.quantity}</p>
                        {menuItemDetails && (
                            <div>
                                <p>Menu Item Name: {menuItemDetails.name}</p>
                                <p>Price: ${menuItemDetails.price}</p>
                                <p>Time to Cook: {menuItemDetails.TimeToCook}</p>
                                <p>Status: {menuItemDetails.isSoldOut ? "Sold Out" : "Available"}</p>
                            </div>
                        )}
                        <br />
                    </div>
                );
            })}
        </div>
    );
};

export default Order;
