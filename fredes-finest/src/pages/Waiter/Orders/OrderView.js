import React from 'react';
import { useOrder } from '../../../services/OrderContext';
import Order from '../../../Components/OrderItem/Order';

function WaiterOrderView() {
  const { currentOrder } = useOrder(); 

  return (
    <div className="order-view-container">
      <h1>Waiter Order View</h1>
      <div className="order-column-container">
        <div className="order-column">
          <h2>New Order</h2>
          {currentOrder.filter(item => item.status === 'new order').map(item => (
            <Order key={item.id} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} id={item.id} />
          ))}
        </div>
        <div className="order-column">
          <h2>Preparing</h2>
          {currentOrder.filter(item => item.status === 'preparing').map(item => (
            <Order key={item.id} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} id={item.id} />
          ))}
        </div>
        <div className="order-column">
          <h2>Done</h2>
          {currentOrder.filter(item => item.status === 'done').map(item => (
            <Order key={item.id} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} id={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WaiterOrderView;