import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthRoute = createContext();

export const AuthProvider = ({ children }) => {
  const backendURI =
    process.env.REACT_APP_BACKEND_URI || "http://localhost:4000";

  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [totalSales, setTotalSales] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // Fetch total sales
  const fetchTotalSales = async () => {
    try {
      const { data } = await axios.get(`${backendURI}/api/total-sales`);
      if (data.success) {
        setTotalSales(data.totalSales);
      } else {
        toast.error("Failed to fetch total sales");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching total sales");
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendURI}/api/orders-info`,{withCredentials: true}); // Use the order review API to get all orders
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        setError(response.data.message); // Set error state if any issue
      }
    } catch (err) {
      setError("Error fetching orders."); // Set error state if request fails
    } finally {
      setLoading(false); // Turn off the loading state
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(
        `${backendURI}/api/orders/update-status/${orderId}`,
        { status },
        { withCredentials: true }
      );
      if (response.data.success) {
        // Successfully updated order, refresh the orders list
        fetchOrders();
      } else {
        setError("Failed to update the order status");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const checkToken = () => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
          setIsLogin(true);
          setUserData({
            isVerified: decoded.isVerified,
            role: decoded.role,
          });
        } else {
          Cookies.remove("token");
          setIsLogin(false);
          setUserData(null);
        }
      } catch (error) {
        console.error("Invalid token", error);
        setIsLogin(false);
        setUserData(null);
      }
    } else {
      setIsLogin(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    checkToken();
    fetchTotalSales();
    fetchOrders(); // Fetch orders when component mounts
  }, []); // Run only on mount

  useEffect(() => {
    console.log("Orders:", orders);
  }, [orders]); // This will log whenever orders update

  useEffect(() => {
    const interval = setInterval(() => {
      checkToken(); // Re-check token validity every 6 seconds
    }, 6000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <AuthRoute.Provider
      value={{
        isLogin,
        setIsLogin,
        backendURI,
        setUserData,
        userData,
        checkToken,
        updateOrderStatus,
        totalSales,
        orders,
        fetchOrders, // Passing the fetchOrders function
        loading, // Passing loading state
        error, // Passing error state for handling in components
      }}
    >
      {children}
    </AuthRoute.Provider>
  );
};
