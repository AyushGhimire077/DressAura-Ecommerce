import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const location = useLocation();

  useEffect(() => {
    // Extract query params from the URL
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const orderId = params.get("orderId");

    setPaymentStatus(status);
    setOrderId(orderId);

    // You might want to send this data to the backend to mark the order as completed
    // axios.post('/api/update-order-status', { orderId, status });
  }, [location.search]);

  return (
    <div>
      {paymentStatus === "success" ? (
        <div>
          <h1>Payment Successful</h1>
          <p>Your order ID: {orderId}</p>
          <p>Thank you for your purchase!</p>
        </div>
      ) : (
        <div>
          <h1>Payment Failed</h1>
          <p>Something went wrong, please try again.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
