// Order.js
function Order({ status, menuItem, quantity, comment }) {
  return (
    <div className="orderItem">
      <div className="orderHeader">
        <div className="menuItemName">{menuItem.name}</div>
        <div className="orderStatus">{status}</div>
      </div>
      <p>Quantity: {quantity}</p>
      <p>Price: {menuItem.price}</p>
      {comment && <p>Comment: {comment}</p>}
    </div>
  );
}
export default Order;