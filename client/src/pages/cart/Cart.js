import React, { useContext, useState, useEffect } from "react";
import { AuthRoute } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const {
    removeFromCart,
    getTotal,
    clearCart,
    getCartCount,
    products,
    addToCart,
    fetchProducts,
    updateCartQuantity,
  } = useContext(AuthRoute);

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart); // Load cart initially
  }, [fetchProducts]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    updateCartQuantity(productId, newQuantity);

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setCart((prevCart) => {
      const updatedCart = [...prevCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const orderId = localStorage.getItem("orderId"); 

  const handleNav = () => {
    if (orderId) {
      navigate(`/order-info`);
    } else {
      console.error("No orderId found in localStorage");
    }
  };

  return (
    <>
      <div className="cart-container">
        <h1>Your Cart</h1>
        {cart.length > 0 ||
          (cart.length === 0 && (
            <button className="order-info-btn" onClick={handleNav}>
              View Orders
            </button>
          ))}

        {cart.length > 0 ? (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.image?.url}
                  alt={item.name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>Price: Rs.{item.price}</p>
                  <div className="cart-quantity">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-footer">
              <h2>Total Items: {getCartCount()}</h2>
              <h2>Total Amount: Rs.{getTotal()}</h2>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
              {cart.length > 0  && (
                  <button className="order-info-btn" onClick={handleNav}>
                    View Orders
                  </button>
                )}

              <button className="checkout-btn">
                <Link style={{ color: "white" }} to="/process-checkout">
                  Proceed to Checkout
                </Link>
              </button>
            </div>
          </div>
        ) : (
          <p>Your cart is empty. Add some products to continue shopping.</p>
        )}
      </div>
      <div className="product-container">
        <div className="pro-cart-container">
          {products.length > 0 ? (
            products.map((product) => {
              const cartItem = cart.find((item) => item._id === product._id);

              return (
                <div key={product._id} className="product-card">
                  <img
                    src={product.image?.url}
                    alt={product.name}
                    className="product-img"
                  />
                  <h2 className="product-name">{product.name}</h2>
                  <h2 className="product-desc">{product.description}</h2>
                  <p className="product-price">Rs.{product.price}</p>

                  {cartItem ? (
                    <div className="cart-controls">
                      <button
                        className="decrease-btn"
                        onClick={() =>
                          handleQuantityChange(
                            product._id,
                            cartItem.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span className="cart-quantity">{cartItem.quantity}</span>
                      <button
                        className="increase-btn"
                        onClick={() =>
                          handleQuantityChange(
                            product._id,
                            cartItem.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p className="no-products">No products available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
