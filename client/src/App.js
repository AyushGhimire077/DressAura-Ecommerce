import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Footer from "./components/footer/Footer";
import ForgetPass from "./pages/forgetPass/ForgetPass";
import Verify from "./pages/verify-page/Verify";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import PaymentSuccess from "./pages/payment/PaymentSucess";
import PaymentCancelled from "./pages/payment/PayemntFail";
import CheckOut from "./pages/checkout/CheckOut";
import OrderInfo from "./components/orderStatus/OrderInfo";

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth-page" element={<Auth />} />
          <Route path="/forget-password" element={<ForgetPass />} />
          <Route path="/verify-email" element={<Verify />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/process-checkout" element={<CheckOut />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancelled" element={<PaymentCancelled />} />
          <Route path="/order-info" element={<OrderInfo />} />{" "}
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
