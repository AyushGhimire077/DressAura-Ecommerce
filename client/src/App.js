import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Footer from "./components/footer/Footer";
import ForgetPass from "./pages/forgetPass/ForgetPass";
import Verify from "./pages/verify-page/Verify";

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth-page" element={<Auth />} />
          <Route path="/forget-password" element={<ForgetPass />} />
          <Route path="/verify-email" element={<Verify />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
