import React from 'react';
import { useOrder } from '../../../services/OrderContext';

function OrderView() {
  const { currentOrder } = useOrder(); // Access currentOrder state

  return (
    <div>
      <h1>Orders</h1>
      {currentOrder.map((orderItem, index) => (
        <div key={index}>
          {/* Render order items here */}
          <p>Order Item: {orderItem.menuItem.name} - Quantity: {orderItem.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderView;