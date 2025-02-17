import React, { useState, useEffect, useContext } from "react";
import "../product/product.css";
import Navbar from "../../components/navbar/Navbar";
import { AuthRoute } from "../../context/authContext";

const Trending = () => {
  const {
    products,
    addToCart,
    fetchProducts,
    cart,
    updateCartQuantity,
    removeFromCart,
  } = useContext(AuthRoute);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, [fetchProducts]);

  useEffect(() => {
    const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000; // Time for 2 days ago

    const recentProducts = products.filter((product) => {
      const createdAtTimestamp = new Date(product.createdAt).getTime();
      return createdAtTimestamp >= twoDaysAgo; // Show products created in the last 2 days
    });

    setFilteredProducts(recentProducts);
  }, [products]); // Recalculate when products update

  return (
    <div className="product-container">
      <div className="product-container-img">
        <Navbar />
        <div className="pro-head">
          <div className="side-head">
            <h1>Everything you want</h1>
            <h3>Start your new AURA with us</h3>
          </div>
        </div>

        <div className="pro-cart-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
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
                        onClick={() => {
                          if (cartItem.quantity === 1) {
                            removeFromCart(product._id);
                          } else {
                            updateCartQuantity(
                              product._id,
                              cartItem.quantity - 1
                            );
                          }
                        }}
                      >
                        -
                      </button>
                      <span className="cart-quantity">{cartItem.quantity}</span>
                      <button
                        className="increase-btn"
                        onClick={() =>
                          updateCartQuantity(product._id, cartItem.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p className="no-products">
              No new products available in the last 2 days.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trending;
