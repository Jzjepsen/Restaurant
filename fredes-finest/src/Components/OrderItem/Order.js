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
            {currentOrder.map((order, orderIndex) => (
                <div key={orderIndex}>
                    <p>OrderId: {order.orderId}</p>
                    <p>TableId: {order.tableId}</p>
                    <p>Total amount: ${order.totalAmount}</p>
                    <p>Status: {order.status}</p>
                    {order.orderItems.map((orderItem, itemIndex) => {
                        const menuItemDetails = getMenuItemDetails(orderItem.menuItemId);
                        return (
                            <div key={orderItem.orderItemId || itemIndex}>
                                <p>OrderItemId: {orderItem.orderItemId || itemIndex}</p>
                                <p>menuItemId: {orderItem.menuItemId}</p>
                                <p>MenuItem Name: {menuItemDetails ? menuItemDetails.name : 'N/A'}</p>
                                <p>comment: {orderItem.comment}</p>
                                <p>quantity: {orderItem.quantity}</p>
                                {menuItemDetails && (
                                    <div>
                                        <p>Price: ${menuItemDetails.price}</p>
                                        <p>Time to Cook: {menuItemDetails.timeToCook}</p>
                                        <p>Status: {menuItemDetails.soldOut ? "Sold Out" : "Available"}</p>
                                    </div>
                                )}
                                <br />
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Order;
