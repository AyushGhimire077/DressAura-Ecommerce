import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from 'js-cookie'
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBox,
  faUsers,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AuthRoute } from "../../context/authContext";

const Sidebar = () => {
  const location = useLocation();

  const { setIsLogin,isLogin, userData } = useContext(AuthRoute);

  const isActiveLink = (path) => location.pathname === path;

  if (!isLogin || userData?.role !== 'admin') {
    return <div className="sidebar-container">
      <div className="sidebar-img">    </div>
    </div>;
  }

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLogin(false)
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar-head">
        <h1>THE FISH BOWL</h1>
        <h3>Admin Panel</h3>
      </div>
      <hr />
      <div className="sidebar-comp">
        <div
          className={`comp-box ${
            isActiveLink("/admin/dashboard") ? "active" : ""
          }`}
        >
          <Link to="/admin/dashboard" className="link">
            <FontAwesomeIcon icon={faHome} className="icon" />
            <h3>DashBoard</h3>
          </Link>
        </div>

        <div
          className={`comp-box ${
            isActiveLink("/admin/manage-product") ? "active" : ""
          }`}
        >
          <Link to="/admin/manage-product" className="link">
            <FontAwesomeIcon icon={faBox} className="icon" />
            <h3>Manage Product</h3>
          </Link>
        </div>

        <div
          className={`comp-box ${
            isActiveLink("/admin/manage-users") ? "active" : ""
          }`}
        >
          <Link to="/admin/manage-users" className="link">
            <FontAwesomeIcon icon={faUsers} className="icon" />
            <h3>Manage Users</h3>
          </Link>
        </div>

        <div
          className={`comp-box ${
            isActiveLink("/admin/reports") ? "active" : ""
          }`}
        >
          <Link to="/admin/reports" className="link">
            <FontAwesomeIcon icon={faFileAlt} className="icon" />
            <h3>Reports</h3>
          </Link>
        </div>
      </div>
      <div class="logout">
        <p onClick={handleLogout}>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
