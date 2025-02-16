import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AuthRoute = createContext();

export const AuthProvider = ({ children }) => {
  const backendURI =
    process.env.REACT_APP_BACKEND_URI || "http://localhost:4000";
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || []; // Load cart initially
  });

  useEffect(() => {
    checkToken();
    fetchProducts();
    const interval = setInterval(checkToken, 6000);
    return () => clearInterval(interval);
  }, []);

  const checkToken = () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setIsLogin(true);
          setUserData(decoded);
        } else {
          logout();
        }
      } catch {
        logout();
      }
    } else {
      logout();
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsLogin(false);
    setUserData(null);
    if (isLogin) clearCart(); // Only clear the cart if user was logged in
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendURI}/api/products`);
      setProducts(response.data.products || []);
    } catch {
      setProducts([]);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  const updateUserData = (newData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const addToCart = (product) => {
    const updatedCart = cart.some((item) => item._id === product._id)
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    updateCart(updatedCart);
    toast.success("Added to cart");
  };

  const removeFromCart = (productId) =>
    updateCart(cart.filter((item) => item._id !== productId));

  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    updateCart(
      cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    updateCart([]);
    localStorage.removeItem("cart");
  };

  const getCartCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const setOrderId = (orderId) => {
    localStorage.setItem("orderId", orderId); // Store in localStorage
  };

  const getOrderId = () => {
    return localStorage.getItem("orderId"); // Get from localStorage
  };

  return (
    <AuthRoute.Provider
      value={{
        isLogin,
        setIsLogin,
        backendURI,
        userData,
        setUserData,
        products,
        fetchProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartCount,
        getTotal,
        updateUserData,
        setOrderId, // Provide setOrderId function
        getOrderId, // Provide getOrderId function
      }}
    >
      {children}
    </AuthRoute.Provider>
  );
};
