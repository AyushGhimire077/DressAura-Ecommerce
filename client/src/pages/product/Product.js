import React, { useState, useEffect, useContext } from "react";
import "./product.css";
import Navbar from "../../components/navbar/Navbar";
import { AuthRoute } from "../../context/authContext";
import { productImages } from "../../assets/assects";

const Product = () => {
  const {
    products,
    addToCart,
    fetchProducts,
    cart,
    updateCartQuantity,
    removeFromCart,
  } = useContext(AuthRoute);
  const [activeUser, setActiveUser] = useState("Activeware");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryClick = (category) => {
    setActiveUser(category);
  };

  const filteredProducts = products.filter(
    (product) => product.category === activeUser
  );

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

        <div className="product-category">
          <div className="cat-head">
            <h1>Categories</h1>
          </div>
          <div className="cat-box-container">
            {[
              { name: "Activeware", img: productImages.activeWare },
              { name: "Upper", img: productImages.upper },
              { name: "Lower", img: productImages.lower },
              { name: "Shoes", img: productImages.shoes },
              { name: "Accessories", img: productImages.acess },
            ].map((category) => (
              <div
                key={category.name}
                className={`cat-box ${activeUser === category.name ? "active" : ""}`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="product-img"
                />
                <div className="text-overlay">{category.name}</div>
              </div>
            ))}
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
              No products available for {activeUser}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
