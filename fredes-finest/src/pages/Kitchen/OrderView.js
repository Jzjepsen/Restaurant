import React from 'react';
import { useOrder } from '../../../services/OrderContext';
import Order from '../../../Components/OrderItem/Order';

function OrderView() {

  return (
    <div>
      <h1>Orders</h1>
      <Order/>
    </div>
  );
}

export default OrderView;