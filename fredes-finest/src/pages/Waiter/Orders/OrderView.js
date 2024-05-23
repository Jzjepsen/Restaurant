import React from 'react';
import { useOrder } from '../../../services/OrderContext';
import Order from '../../../Components/OrderItem/Order';

// In src/pages/Waiter/Orders/OrderView.js

function WaiterOrderView() {
  const { currentOrder } = useOrder();

  return (
    <div className="order-view-container">
      <h1>Waiter Order View</h1>
      {currentOrder && currentOrder.map(order => (
        order && order.menuItem && order.menuItem.menuItemId ? (
          <Order key={order.orderId} order={order} />
        ) : (
          console.error("Invalid order or menuItem:", order)
        )
      ))}

      <div className="order-column-container">
        {/* New Order Column */}
        <div className="order-column">
          <h2>New Order</h2>
          {currentOrder && currentOrder.filter(item => item.status === 'New').length > 0 ? (
            currentOrder.filter(item => item.status === 'New').map(item => (
              item && item.menuItem && item.menuItem.menuItemId ? (
                <Order key={item.menuItem.menuItemId} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} id={item.menuItem.menuItemId} isKitchenView={true} />
              ) : (
                console.error("Invalid order or menuItem:", item)
              )
            ))
          ) : (
            <p>No new orders found.</p>
          )}
        </div>
        {/* Preparing Column */}
        <div className="order-column">
          <h2>Preparing</h2>
          {currentOrder && currentOrder.filter(item => item.status === 'Preparing').length > 0 ? (
            currentOrder.filter(item => item.status === 'Preparing').map(item => (
              item && item.menuItem && item.menuItem.menuItemId ? (
                <Order key={item.menuItem.menuItemId} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} id={item.menuItem.menuItemId} isKitchenView={true} />
              ) : (
                console.error("Invalid order or menuItem:", item)
              )
            ))
          ) : (
            <p>No preparing orders found.</p>
          )}
        </div>
        {/* Done Column */}
        <div className="order-column">
          <h2>Done</h2>
          {currentOrder && currentOrder.filter(item => item.status === 'Done').length > 0 ? (
            currentOrder.filter(item => item.status === 'Done').map(item => (
              item && item.menuItem && item.menuItem.menuItemId ? (
                <Order key={item.menuItem.menuItemId} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} id={item.menuItem.menuItemId} isKitchenView={true} />
              ) : (
                console.error("Invalid order or menuItem:", item)
              )
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
