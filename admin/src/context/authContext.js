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
  const [products, setProducts] = useState([]); // Track products
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
      const response = await axios.get(`${backendURI}/api/orders-info`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        setError(response.data.message); // Set error state if any issue
      }
    } catch (err) {
      setError("Error fetching orders.");
    } finally {
      setLoading(false); // Turn off the loading state
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendURI}/api/admin/products`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setError("Failed to fetch products");
      }
    } catch (error) {
      setError("Error fetching products");
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${backendURI}/api/admin/delete-product/${productId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        // Remove product from the local state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        toast.success("Product deleted successfully");
      } else {
        setError(response.data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      setError("Error deleting product");
    }
  };

  // Update a product
  const updateProduct = async (productId, updatedData) => {
    try {
      const response = await axios.put(
        `${backendURI}/api/admin/update-product/${productId}`,
        updatedData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, ...updatedData } : product
          )
        );
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error updating product");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(
        `${backendURI}/api//update-status/${orderId}`,
        { status },
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchOrders();
      } else {
        setError("Failed to update the order status");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating order status");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${backendURI}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        Cookies.set("token", response.data.token); // Store the token in cookies
        setIsLogin(true);
        setUserData(response.data.user);
        toast.success("Login successful");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
      toast.error("An error occurred during login");
    }
  };

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
    fetchOrders();
    fetchProducts(); // Fetch products when component mounts
  }, []);

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
        login,
        updateOrderStatus,
        deleteProduct, // Expose deleteProduct function
        totalSales,
        orders,
        products, // Pass products state to provider
        fetchOrders,
        fetchProducts, // Pass fetchProducts function
        loading,
        error,
        updateProduct,
      }}
    >
      {children}
    </AuthRoute.Provider>
  );
};
