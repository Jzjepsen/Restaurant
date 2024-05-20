import React from 'react';
import { useOrder } from '../../../services/OrderContext';
import Order from '../../../Components/OrderItem/Order';

// In src/pages/Waiter/Orders/OrderView.js

function WaiterOrderView() {
  const { currentOrder } = useOrder();

  return (
    <div className="order-view-container">
      <h1>Kitchen Order View</h1>
      {currentOrder.map(order => (
  <Order key={order.orderId} order={order} />
))}
      <div className="order-column-container">
        {/* New Order Column */}
        <div className="order-column">
          <h2>New Order</h2>
          {currentOrder.filter(item => item.status === 'new').map(item => (
            <Order key={item.id} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} id={item.id} isKitchenView={true} />
          ))}
        </div>

        {/* Preparing Column */}
        <div className="order-column">
          <h2>Preparing</h2>
          {currentOrder.filter(item => item.status === 'preparing').map(item => (
            <Order key={item.id} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} id={item.id} isKitchenView={true} />
          ))}
        </div>

        {/* Add more columns for other statuses as needed */}

      </div>
    </div>
  );
}

export default WaiterOrderView;

