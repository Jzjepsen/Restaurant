import React from 'react';
import Order from '../../Components/OrderItem/Order';
import './OrderView.css'; // Import the CSS file
import { useOrder } from '../../services/OrderContext';

function KitchenOrderView() {
    const { orderItems } = useOrder();

    return (   
    <div className="order-view-container">
        <h1>Orders</h1> 
        <div className="order-column-container">
            <div className="order-column">
                <h2>New Order</h2>
                {orderItems.filter(item=>item.status === 'new order').map(item=>(
                    <Order key={item.id} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} />
                ))}
                </div>
                <div className="order-column">
                    <h2>Preparing</h2>
                    {orderItems.filter(item => item.status === 'preparing').map(item => (
                        <Order key={item.id} status={item.status} menuItem={item.menuItem} quantity={item.quantity} comment={item.comment} />
                    ))}            
                </div>
            </div>
        </div>
      );
    }

export default KitchenOrderView;