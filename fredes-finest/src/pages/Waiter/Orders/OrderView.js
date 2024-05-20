import React from 'react';
import { useOrder } from '../../../services/OrderContext';
import Order from '../../../Components/OrderItem/Order';

// In src/pages/Waiter/Orders/OrderView.js

function WaiterOrderView() {
  const { currentOrder } = useOrder();

  return (
    <div className="order-view-container">
      <h1>Waiter Order View</h1>
              {currentOrder.map(order => (
  <Order key={order.orderId} order={order} />
))}

      <div className="order-column-container">
        {/* New Order Column */}
        <div className="order-column">
          <h2>New Order</h2>
          {currentOrder.filter(item => item.status === 'Pending').length > 0? (
    currentOrder.filter(item => item.status === 'New').map(item => (
      <Order key={item.id} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} id={item.id} isKitchenView={true}/>
    ))
  ) : (
    <p>No new orders found.</p>
  )}
        </div>

        {/* Preparing Column */}
        <div className="order-column">
          <h2>Preparing</h2>
          {currentOrder.filter(item => item.status === 'Preparing').length > 0? (
    currentOrder.filter(item => item.status === 'Prepared').map(item => (
      <Order key={item.id} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} id={item.id} isKitchenView={true}/>
    ))
  ) : (
    <p>No preparing orders found.</p>
  )}
        </div>

          {/* Done Column */}
          <div className="order-column">
          <h2>Done</h2>
          {currentOrder.filter(item => item.status === 'Completed').length > 0? (
    currentOrder.filter(item => item.status === 'Done').map(item => (
      <Order key={item.id} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} id={item.id} isKitchenView={true}/>
    ))
  ) : (
    <p>No done orders found.</p>
  )}
        </div>
      </div> 
      
      
    </div>
  );
}

export default WaiterOrderView;

