// orderRoute.js
import express from "express";
import {
  controllTotelSell,
  orderController,
  placeOder,
} from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/total-sales", controllTotelSell);
orderRouter.post('/create-order', placeOder)
orderRouter.put("/update-status/:orderId", orderController);

export { orderRouter };
