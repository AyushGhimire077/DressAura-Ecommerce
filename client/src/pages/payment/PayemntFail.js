import React, { useEffect } from "react";
import "./payment.css";

const PaymentCancelled = () => {
  useEffect(() => {
    console.log("Payment was cancelled.");
  }, []);

  return (
    <div className="payment-cancelled">
      <div class="cancell-text">
      <h1>Payment Cancelled</h1>
      <p>
        Your payment has been cancelled. You can try again or check your order.
      </p>
      <button onClick={() => (window.location.href = "/cart")}>
        Go Back to Cart
      </button>

      </div>
    </div>
  );
};

export default PaymentCancelled;
