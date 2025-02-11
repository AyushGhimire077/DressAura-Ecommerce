import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import ManageProduct from "./pages/manageProducts/ManageProduct";
import ManageUsers from "./pages/manageUser/ManageUsers";
import Reports from "./pages/reports/Reports";
import Sidebar from "./component/sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
import { AuthRoute } from "./context/authContext";
import Unauthorized from "./pages/unauth/Unauthorized";
import Auth from "./pages/auth/Auth";

const App = () => {
  const { isLogin, checkToken } = useContext(AuthRoute);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (loading) {
        await checkToken();
        setLoading(false);
      }
    };
    checkAuth(); 
  }, [loading, checkToken]); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div style={{ display: "flex" }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0F0F0F",
            color: "white",
            fontFamily: "'Outfit', sans-serif",
            borderRadius: "8px",
            padding: "10px",
            fontSize: "14px",
            maxWidth: "100%",
            boxShadow: "0px 0px 20px rgba(235, 230, 230, 0.1)",
          },
        }}
      />
      <Router>
        <Sidebar />
        <div style={{ marginLeft: "312px", height: "auto", width: "100%" }}>
          <Routes>
            {isLogin ? (
              <>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/admin/manage-product"
                  element={<ManageProduct />}
                />
                <Route path="/admin/manage-users" element={<ManageUsers />} />
                <Route path="/admin/reports" element={<Reports />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/unauthorized" />} />
            )}

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/admin/login" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
