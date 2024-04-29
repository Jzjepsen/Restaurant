import React from 'react';
import './Orders.css';

function Orders() {
    const dummyOrders = [
        {
            menuItem: { id: 1, name: 'Pizza', price: 10 },
            quantity: 2,
            comment: 'Extra cheese',
            status: 'new order'
        },
        {
            menuItem: { id: 2, name: 'Burger', price: 8 },
            quantity: 1,
            comment: 'No onions',
            status: 'preparing'
        },
        {
            menuItem: { id: 3, name: 'Salad', price: 7 },
            quantity: 3,
            comment: 'Add olives',
            status: 'done'
        },
        {
            menuItem: { id: 4, name: 'Taco', price: 9 },
            quantity: 2,
            comment: 'Extra salsa',
            status: 'new order'
        }
    ];

    const filterOrdersByStatus = (status) =>
        dummyOrders.filter(order => order.status === status);

    const newOrders = filterOrdersByStatus('new order');
    const preparingOrders = filterOrdersByStatus('preparing');
    const doneOrders = filterOrdersByStatus('done');

    return (
        <div className="ordersContainer">
            <h1>Orders</h1>
            <div className="ordersColumns">
                <div className="orderColumn">
                    <h2>New Orders</h2>
                    {newOrders.map(order => (
                        <OrderItem
                            key={order.menuItem.id}
                            item={order}
                            status={order.status}
                            onItemClick={() => console.log(`Clicked on ${order.menuItem.name}`)}
                            onCommentChange={(id, comment) => console.log(`Comment for ${id}: ${comment}`)}
                        />
                    ))}
                </div>
                <div className="orderColumn">
                    <h2>Preparing</h2>
                    {preparingOrders.map(order => (
                        <OrderItem
                            key={order.menuItem.id}
                            item={order}
                            status={order.status}
                            onItemClick={() => console.log(`Clicked on ${order.menuItem.name}`)}
                            onCommentChange={(id, comment) => console.log(`Comment for ${id}: ${comment}`)}
                        />
                    ))}
                </div>
                <div className="orderColumn">
                    <h2>Done</h2>
                    {doneOrders.map(order => (
                        <OrderItem
                            key={order.menuItem.id}
                            item={order}
                            status={order.status}
                            onItemClick={() => console.log(`Clicked on ${order.menuItem.name}`)}
                            onCommentChange={(id, comment) => console.log(`Comment for ${id}: ${comment}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Orders;
