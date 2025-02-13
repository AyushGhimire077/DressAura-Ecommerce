import Order from "../model/orderModel.js";

const controllTotelSell = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    res.json({ success: true, totalSales: totalSales[0]?.total || 0 });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get total sales" });
  }
};

const placeOder = async (req, res) => {
  const { userId, items, totalPrice, number, address } = req.body;
  try {
    if (!userId || !items || !totalPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      number,
      address,
      status: "pending",
    });
    await newOrder.save();

    res
      .status(201)
      .json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const orderController = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

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
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", updatedOrder });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update order status" });
  }
};

export { controllTotelSell, orderController, placeOder };
