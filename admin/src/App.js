import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import ManageProduct from "./pages/manageProducts/ManageProduct";
import ManageUsers from "./pages/manageUser/ManageUsers";
import Reports from "./pages/reports/Reports";
import Sidebar from "./component/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <Router>
      <div className="app-container">
        <Sidebar />
    
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/manage-product" element={<ManageProduct />} />
            <Route path="/admin/manage-users" element={<ManageUsers />} />
            <Route path="/admin/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  );
};

export default App;
