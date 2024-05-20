function Order({ status, menuItem, quantity, comment, id, updateStatus, isKitchenView}) {
  console.log('Order component received updateStatus:', updateStatus);

  return (
    <div className="orderItem">
      <div className="orderHeader">
        <div className="menuItemName">{menuItem.name}</div>
        <div className="orderStatus">{status}</div>
      </div>
      <p>Quantity: {quantity}</p>
      <p>Price: {menuItem.price}</p>
      {comment && <p>Comment: {comment}</p>}
      {isKitchenView && status === 'new order' && (
        <button onClick={() => updateStatus(id, 'preparing')}>Start Preparing</button>
      )}
      {isKitchenView && status === 'preparing' && (
        <button onClick={() => updateStatus(id, 'done')}>Mark as Done</button>
      )}
    </div>
  );
}
export default Order;
