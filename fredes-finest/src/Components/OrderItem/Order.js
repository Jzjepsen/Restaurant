import { useOrder } from "../../services/OrderContext";

const Order = () => {
    const { currentOrder } = useOrder();

    return (
        <div>
          {currentOrder.map((orderItem, index) => (
            <div key={index}>
              <p> Order Item: {orderItem.menuItem.name} </p>
              <p> Quantity: {orderItem.quantity} </p>
              <p> Time to Cook: {orderItem.menuItem.TimeToCook} </p>
              <p> Price: {orderItem.menuItem.price} </p>
              <br/>
            </div>
          ))}
        </div>
      );
}
 
export default Order;