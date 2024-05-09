import React from 'react';
import './WaiterOverview.css';
import { useNavigate } from 'react-router-dom';
function WaiterOverview() {
const navigate = useNavigate();

const handleCreateNewOrder=()=>{
    console.log('Create New Order button clicked');
    navigate('/Waiter/Orders/CreateOrder'); 
}

const handleReceivePayment = () => {
    console.log('Receive Payment button clicked');
    navigate('/Waiter/Payment/Payment'); 

};

    return (
        <div style={{ textAlign: 'center' }}>
        <h1>Waiter Overview</h1>
        <div className="waiter-overview">
            <button onClick={handleCreateNewOrder}>CREATE NEW ORDER</button>
            <button onClick={handleReceivePayment}>RECEIVE PAYMENT</button>
        </div>
        </div>
    );
}

export default WaiterOverview;
