import Order from "../model/orderModel.js";
import mongoose from "mongoose";

const getTotalSales = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    res.json({ success: true, totalSales: totalSales[0]?.total || 0 });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get total sales" });
  }
};

const getOrderInfo = async (req, res) => {
  const userId = req.id; // Extracting userId from decoded JWT

  try {
    // Make sure the query to fetch orders is correct
    const orders = await Order.find({ userId: userId });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }

    return res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// In Express backend (assuming your order model is connected to MongoDB)
const orderController = async (req, res) => {
  const { status } = req.body;
  const { orderId } = req.params;

  if (!["pending", "processing", "completed", "cancelled"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update order status" });
  }
};


const placeOrder = async (req, res) => {
  const { orderId } = req.params;
  const { userId, number, address, totalPrice, items } = req.body;

  try {
    const newOrder = new Order({
      orderId,
      userId,
      number,
      address,
      totalPrice,
      items,
      status: "pending",
    });

    await newOrder.save();

    res.json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
};

export { getTotalSales, orderController, getOrderInfo, placeOrder };
