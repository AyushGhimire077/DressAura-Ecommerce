import React, { useState } from "react";
import "./product.css";
import Navbar from "../../components/navbar/Navbar";
import { productImages } from "../../assets/assects";

const Product = () => {

  const [activeUser, setActiveUser] = useState('Activeware');

  const handleCategoryClick = (category) => {
    setActiveUser(category);
  }
  

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
          <div class="cat-head">
            <h1>Categories</h1>
          </div>
          <div className="cat-box-container">
            <div
              className={`cat-box ${activeUser === "Activeware" ? "active" : ""}`}
              onClick={() => handleCategoryClick("Activeware")}
            >
              <img src={productImages.activeWare} alt="img" />
              <div className="text-overlay">Activewear</div>
            </div>

            <div
              className={`cat-box ${activeUser === "Upper" ? "active" : ""}`}
              onClick={() => handleCategoryClick("Upper")}
            >
              <img src={productImages.upper} alt="img" />
              <div className="text-overlay">Upper</div>
            </div>

            <div
              className={`cat-box ${activeUser === "Lower" ? "active" : ""}`}
              onClick={() => handleCategoryClick("Lower")}
            >
              <img src={productImages.lower} alt="img" />
              <div className="text-overlay">Lower</div>
            </div>

            <div
              className={`cat-box ${activeUser === "Shoes" ? "active" : ""}`}
              onClick={() => handleCategoryClick("Shoes")}
            >
              <img src={productImages.shoes} alt="img" />
              <div className="text-overlay">Shoes</div>
            </div>

            <div
              className={`cat-box ${activeUser === "Accessories" ? "active" : ""}`}
              onClick={() => handleCategoryClick("Accessories")}
            >
              <img src={productImages.acess} alt="img" />
              <div className="text-overlay">Accessories</div>
            </div>
          </div>
        </div>

        <div className="pro-cart-container">
          <div className="cart"></div>
        </div>
      </div>
    </div>
  );
};

export default Product;
