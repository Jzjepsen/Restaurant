// CreateOrder.js
import React, { useState } from 'react';
import './CreateOrder.css';
import OrderItems from '../../../Components/OrderItem/OrderItems';
import SuccesModal from '../../../Components/Dialogs/SuccesModal';
import FailedModal from '../../../Components/Dialogs/FailedModal';
import Menu from '../../../Components/Menu/Menu';
import { useMenu } from '../../../services/MenuContext';
import { useOrder } from '../../../services/OrderContext';


function CreateOrder() {
    // hooks
    const { currentOrder, setCurrentOrder } = useOrder(); // Access currentOrder and setCurrentOrder from context
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isSubmitModalOpen, setSubmitSuccessfulOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isSubmitFailedModalOpen, setIsSubmitFailedModalOpen] = useState(false);
    const [isAddFailedModalOpen, setIsAddFailedModalOpen] = useState(false);
    const { menuItems } = useMenu();


    const addToOrder = (menuItem) => {
        if (menuItem.soldOut) {
            setIsAddFailedModalOpen(true);
        } else {
            // Check if menuItem is valid before proceeding
            if (!menuItem || typeof menuItem !== 'object' || !menuItem.menuItemId) {
                console.error("Invalid menuItem:", menuItem);
                return; // Exit the function early if menuItem is invalid
            }
    
            const existingItemIndex = currentOrder.findIndex(item => 
                item && item.menuItem && item.menuItem.menuItemId === menuItem.menuItemId
            );
    
            if (existingItemIndex >= 0) {
                // Increase the quantity of the existing item
                setCurrentOrder(currentOrder.map((item, index) => 
                    index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
                ));
            } else {
                // Add a new item to the order
                setCurrentOrder([...currentOrder, { menuItem: menuItem, quantity: 1, comment: '' }]);
            }
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

    const submitOrder = () => {
        // this is where we need to pass the order to the backend via a service and a POST request using a hook 
        console.log('Order stored:', currentOrder);
        setSubmitSuccessfulOpen(true);
        if (false /* replace with actual condition for when submitting fails, meaning we need a catch block in the service for orderItems endpoints */) {
            setIsSubmitFailedModalOpen(true);
          }

    };

    const closeModal = () => {
        setSubmitSuccessfulOpen(false);
        setIsRemoveModalOpen(false);
        setIsSubmitFailedModalOpen(false);
        setIsAddFailedModalOpen(false);


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
                        <SuccesModal 
                                    isOpen={isRemoveModalOpen} 
                                    onRequestClose={closeModal} 
                                    >
                                    Item successfully removed!
                                    </SuccesModal>
                        <button 
                            className="submitButton"
                            onClick={submitOrder}
                            disabled={currentOrder.length === 0}
                            >
                            Submit Order</button>
                            <SuccesModal 
                                isOpen={isSubmitModalOpen} 
                                onRequestClose={closeModal} 
                                >
                                Order successfully submitted!
                            </SuccesModal>
                            <FailedModal 
                                isOpen={isSubmitFailedModalOpen} 
                                onRequestClose={closeModal} 
                                >
                                Order submission failed!
                            </FailedModal>
                    </div>
                    <div className="currentOrderList">
                        {currentOrder.map((item) => {
                            // Safely check if item and item.menuItem exist and are objects
                            if (!item ||!item.menuItem || typeof item.menuItem!== 'object') {
                                return null; // Skip rendering for invalid items
                            }

                            return (
                                <OrderItems 
                                    key={item.menuItem.id}
                                    item={item}
                                    onItemClick={handleItemClick}
                                    onCommentChange={updateComment}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="menuColumn">
                <Menu menuItems={menuItems} addToOrder={addToOrder} showSoldOutStatus={true} />
                </div>
                <FailedModal 
                    isOpen={isAddFailedModalOpen} 
                    onRequestClose={closeModal} 
                    >
                    Menu item sold out!                
                </FailedModal>
            </div>
        </div>
    );
}

export default CreateOrder;