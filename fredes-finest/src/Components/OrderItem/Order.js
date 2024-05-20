import { useOrder } from "../../services/OrderContext";

import React from 'react';

const Order = ({ order }) => {
  return (
      <div>
          <h3>Status: {order.status}</h3>
          <h4>Total Amount: {order.totalAmount}</h4>
          <h4>Table ID: {order.tableId}</h4>
          {order.orderItems.map((item, index) => (
              <div key={index}>
                  <p>Order Item: {item.menuItemId} - Quantity: {item.quantity}</p>
                  <p>Comment: {item.comment}</p>
              </div>
          ))}
      </div>
  );
};

export default Order;