import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './payment.css'

const PaymentSuccess = () => {
  const [orderId, setOrderId] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get("orderId");

    setOrderId(orderId);

  }, [location.search]);

  return (
    <div className="payment-success">
        <div className="success-text">
          <h1>Payment Successful</h1>
          <p>Your order ID: {orderId}</p>
          <p>Thank you for your purchase!</p>
        </div>
    </div>
  );
};

export default PaymentSuccess;
