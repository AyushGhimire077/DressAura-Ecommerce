import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthRoute } from "../../context/authContext";
import UserAcc from "../../components/account/UserAcc";
import "./style.css";

const Navbar = () => {
  const { isLogin } = useContext(AuthRoute);
  const [showUserAcc, setShowUserAcc] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsAuthLoaded(true);
  }, [isLogin]);

  if (!isAuthLoaded) {
    return null;
  }

const handleClickUser = () => setShowUserAcc(true);

  return (
    <div className="navbar">
      <div className="nav-com">
        <ul>
          <li>
            <FontAwesomeIcon className="menu-icon" icon={faBars} size="xl" />
          </li>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={location.pathname === "/products" ? "active" : ""}
            >
              Product
            </Link>
          </li>
          <li>
            <Link
              to="/trending"
              className={location.pathname === "/trending" ? "active" : ""}
            >
              Trending
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              className={location.pathname === "/about-us" ? "active" : ""}
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav-icons">
        <div className="cart">
          <FontAwesomeIcon icon={faCartShopping} size="2xl" />
        </div>
        {!isLogin && (
          <div className="auth">
            <p>
              <Link to="/auth-page">Sign Up</Link>
            </p>
          </div>
        )}
        {isLogin && (
          <div
            onClick={handleClickUser}
            className={`user ${showUserAcc ? "transparent" : ""}`}
          >
            {!showUserAcc ? (
              <FontAwesomeIcon icon={faUser} size="xl" />
            ) : (
              <UserAcc />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
