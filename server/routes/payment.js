import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();
const PaymentRouter = express.Router();

PaymentRouter.post("/process-payment", async (req, res) => {
  const { cart } = req.body;

  // Check if cart is empty
  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  try {
    //  Calculate total price, tax & final amount
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const taxAmount = totalAmount * 0.1; // 10% tax
    const finalAmount = totalAmount + taxAmount;

    // Generate unique transaction ID
    const transactionUuid = `TXN${Date.now()}`;

    //  Get merchant credentials
    const productCode = process.env.ESEWA_PRODUCT_CODE;
    const secretKey = process.env.ESEWA_SECRET_KEY?.trim();

    //  Fields required for signing
    const signedData = `amount=${totalAmount.toFixed(
      2
    )},total_amount=${finalAmount.toFixed(
      2
    )},transaction_uuid=${transactionUuid},product_code=${productCode}`;

    //  Generate HMAC-SHA256 signature
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(signedData)
      .digest("base64");

    // Payment data to send to frontend
    const paymentData = {
      amount: totalAmount.toFixed(2),
      tax_amount: taxAmount.toFixed(2),
      total_amount: finalAmount.toFixed(2),
      transaction_uuid: transactionUuid,
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: productCode,
      success_url: "http://localhost:3000/payment-success",
      failure_url: "http://localhost:3000/payment-cancelled",
      signed_field_names: "amount,total_amount,transaction_uuid,product_code",
      signature,
    };

    console.log("Payment Data:", paymentData);
    return res.json({ paymentData });
  } catch (error) {
    console.error("Payment processing failed:", error);
    res.status(500).json({ error: "Payment processing failed" });
  }
});

export default PaymentRouter;
