import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthRoute } from "../../context/authContext"; // Assuming your auth context is set up
import "./orderInfo.css";
import { useNavigate } from "react-router-dom";

const OrderInfo = () => {
  const [orders, setOrders] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendURI } = useContext(AuthRoute);
  const navigate = useNavigate();

  // Function to fetch all orders for the logged-in user
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${backendURI}/api/orders-info`, {
        withCredentials: true,
      });
      console.log("Response from backend:", data); // Log the response
      if (data.success) {
        // Get current time
        const currentTime = Date.now();

        // Filter out completed orders that are older than 10 hours
        const filteredOrders = data.orders.filter((order) => {
          // Check if the order status is not 'completed' or it's completed but within the last 10 hours
          const orderCreatedAt = new Date(order.createdAt).getTime();
          const isOrderCompletedAndOlderThan10Hours =
            order.status === "completed" &&
            currentTime - orderCreatedAt > 10 * 60 * 60 * 1000;

          return (
            order.status !== "completed" || !isOrderCompletedAndOlderThan10Hours
          );
        });

        setOrders(filteredOrders); // Set the filtered orders
      } else {
        setError(data.message || "Error fetching orders");
      }
    } catch (err) {
      setError("Something went wrong while fetching orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>No orders found for this user.</div>;
  }

  return (
    <div className="order-info-container">
      <h1>Your Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="order-item">
          <h2>Order ID: {order._id}</h2>
          <p>Status: {order.status}</p>
          <p>Total Amount: Rs. {order.totalPrice}</p>
          <ul>
            {order.items &&
              order.items.map((item) => (
                <li key={item.productId}>
                  {item.productName} - Quantity: {item.quantity} - Price: Rs.{" "}
                  {item.price}
                </li>
              ))}
          </ul>
          <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderInfo;
