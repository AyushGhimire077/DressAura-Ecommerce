import React from "react";
import './style.css'
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="unauth-container">
      <h1>UNAUTHORIZED -- Only Admins Have Access</h1>
      <h2>404 Page not found</h2>
      <Link style={{color:"black" }} to="/admin/login">
        <p className="isAdmin">Is Admin ?</p>
      </Link>
    </div>
  );
};

export default Unauthorized;
