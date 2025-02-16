// Your router should look like this:
import express from "express";
import {
  getTotalSales,
  getOrderInfo,
  orderController,
  placeOrder,
} from "../controller/orderController.js";
import authMiddleware from "../middleware/authMiddelware.js";
const orderRouter = express.Router();

orderRouter.get("/total-sales", getTotalSales);

orderRouter.get("/orders-info",authMiddleware, getOrderInfo);

orderRouter.put("/orders/update-status/:orderId", orderController);

orderRouter.post("/create-order/:orderId", placeOrder);

export  {orderRouter};
