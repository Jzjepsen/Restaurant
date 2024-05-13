import { useOrder } from "../../services/OrderContext";

const Order = () => {
    const { currentOrder } = useOrder();

    return (
        <div>
          {currentOrder.map((orderItem, index) => (
            <div key={index}>
              {/* Render order items here */}
              <p>Order Item: {orderItem.menuItem.name} - Quantity: {orderItem.quantity}</p>
            </div>
          ))}
        </div>
      );
}
 
export default Order;