// CreateOrder.js
import React, { useState } from 'react';
import './CreateOrder.css';
import OrderItems from '../../../Components/OrderItem/OrderItems';
import CustomModal from '../../../Components/Dialogs/Modal';

function CreateOrder() {
    // hooks
    const [currentOrder, setCurrentOrder] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);


    // this should be replaced with a call to the backend to get the menu items
    const menuItems = [
        { id: 1, name: 'Pizza', price: 10},
        { id: 2, name: 'Burger', price: 8 },
        // Add more items as needed
    ];

    const addToOrder = (menuItem) => {
        const existingItem = currentOrder.find(item => item.menuItem.id === menuItem.id);
        if (existingItem) {
            // Increase the quantity
            setCurrentOrder(currentOrder.map(item =>
                item.menuItem.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            // Add new item
            setCurrentOrder([...currentOrder, { menuItem: menuItem, quantity: 1, comment: '' }]);
        }
    };

    const removeFromOrder = () => {
        setCurrentOrder(currentOrder.filter(item => item.menuItem.id !== selectedItemId));
        setSelectedItemId(null);
        setIsRemoveModalOpen(true);

    };

    const handleItemClick = (itemId) => {
        setSelectedItemId(itemId);
    };

    const updateComment = (id, comment) => {
        setCurrentOrder(currentOrder.map(item =>
            item.menuItem.id === id ? { ...item, comment: comment } : item
        ));
    };

    const storeOrder = () => {
        // this is where we need to pass the order to the backend via a service and a POST request using a hook 
        console.log('Order stored:', currentOrder);
        setIsRemoveModalOpen(true);

    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsRemoveModalOpen(false);
      };

    return (
        <div className="createOrderContainer">
            <h1 className="heading">Create Order</h1>
            <div className="orderSection">
                <div className="orderColumn">
                    <div className="headerRow">
                        <h2>Current Order</h2>
                        <button 
                            className="removeButton"
                            onClick={removeFromOrder}
                            disabled={!selectedItemId}
                        >
                            Remove
                        </button>
                        <CustomModal 
                                    isOpen={isRemoveModalOpen} 
                                    onRequestClose={closeModal} 
                                    >
                                    Item successfully removed!
                                    </CustomModal>
                        <button 
                            className="submitButton"
                            onClick={storeOrder}
                            disabled={currentOrder.length === 0}
                            >
                                Submit Order</button>
                                <CustomModal 
                                    isOpen={isModalOpen} 
                                    onRequestClose={closeModal} 
                                    >
                                    Order successfully submitted!
                                    </CustomModal>
                    </div>
                    <div className="currentOrderList">
                        {currentOrder.map((item) => (
                            <OrderItems 
                                key={item.menuItem.id}
                                item={item}
                                onItemClick={handleItemClick}
                                onCommentChange={updateComment}
                            />
                        ))}
                    </div>
                </div>
                <div className="menuColumn">
                    <h2>Menu Items</h2>
                    {menuItems.map((item) => (
                        <div key={item.id} onClick={() => addToOrder(item)}>
                            <p>{item.name} - ${item.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CreateOrder;
