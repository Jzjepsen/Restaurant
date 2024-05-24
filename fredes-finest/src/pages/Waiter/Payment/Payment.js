import React, { useState, useEffect } from 'react';

const PaymentPage = () => {
    const [paymentData, setPaymentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const response = await fetch('https://localhost:7033/api/Payments/1', {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch payment data');
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Add this line
                setPaymentData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPaymentData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="payment-page">
            <h1>Payment Details</h1>
                    <div> 
                        <h2>Payment details for ID: {paymentData.paymentId}</h2>
                        <p>Order ID: {paymentData.orderId}</p>
                        <p>Amount: {paymentData.amount}</p>
                        <p>Total Amount: {paymentData.totalAmount}</p>
                    </div>
        </div>
    );
};

export default PaymentPage;
