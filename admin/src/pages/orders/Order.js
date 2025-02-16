import React, { useContext, useState, useEffect } from "react";
import { AuthRoute } from "../../context/authContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./order.css";

const Orders = () => {
  const { backendURI, fetchOrders, orders, updateOrderStatus } =
    useContext(AuthRoute);
  const [isLoading, setIsLoading] = useState(false);


  const filteredOrders = orders
    .filter((order) => order.status !== "completed") // Remove completed orders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort orders by latest

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setIsLoading(true);
      await updateOrderStatus(orderId, newStatus);
      toast.success("Order status updated successfully!");
    } catch (error) {
      toast.error("Failed to update order status!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="orders-page-container">
      <h2 className="orders-title">Orders</h2>
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Product Name</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders && filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                console.log(order); // Log the order to see its structure
                return (
                  <tr key={order._id}>
                    <td>{order.userId}</td>
                    <td>
                      {order.products && order.products.length > 0
                        ? order.products
                            .map((product) => product.name) // Make sure 'name' exists
                            .join(", ")
                        : "No Products"}
                    </td>
                    <td>${order.totalPrice}</td>
                    <td>{order.status}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
