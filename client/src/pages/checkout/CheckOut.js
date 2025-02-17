import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthRoute } from "../../context/authContext";
import "./checkout.css";
import toast from "react-hot-toast";

const CheckOut = () => {
  const { backendURI, userData, updateUserData, cart, getTotal, clearCart } =
    useContext(AuthRoute);

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const userId = userData?.id;
  const navigate = useNavigate();

  const validateForm = () => {
    if (!phoneNumber || !address) {
      toast.error("Please enter both phone number and address.");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }

    return true;
  };

  const handleCashCheckout = async () => {
    if (!validateForm()) return;

    const orderId = Date.now().toString();

    updateUserData({ orderId });
    console.log("updated data is", updateUserData);

    const items = cart.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      price: item.price,
      productName: item.name,
    }));

    console.log("Order Items:", items);

    try {
      const totalPrice = getTotal();

      const { data } = await axios.post(
        `${backendURI}/api/create-order/${orderId}`,
        {
          userId,
          orderId,
          number: phoneNumber,
          address,
          totalPrice,
          items,
        },{withCredentials: true}
      );

      if (data.success) {
        toast.success("Order placed successfully!");
        clearCart();
        navigate(`/order-info`);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Order creation failed!");
    }
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const { data } = await axios.post(`${backendURI}/api/process-payment`, {
        phoneNumber,
        address,
        cart,
      });

      if (data.paymentData) {
        // Create a form dynamically for Esewa payment
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        // Append required input fields
        Object.keys(data.paymentData).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = data.paymentData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit(); // Submit form automatically
      } else {
        toast.error("Payment processing failed!");
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      toast.error("Something went wrong during payment!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="check-head">Check-Out</h1>
      <div className="checkout-page">
        <div className="user-info">
          <h2>Enter Your Information</h2>
          <div className="form-field">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-field">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          <h3>Choose Payment Method</h3>

          <div className="payment-option">
            <h3
              onClick={handleCashCheckout}
              className="payment-method"
              style={{ cursor: "pointer" }}
            >
              Cash On Delivery
            </h3>
          </div>

          <div className="payment-option">
            <h3
              className="payment-method esewa-method"
              onClick={handleCheckout}
              style={{ cursor: "pointer" }}
            >
              {loading ? "Processing..." : "Esewa"}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
