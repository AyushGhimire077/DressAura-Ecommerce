import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthRoute } from "../../context/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import "./style.css";

const Auth = () => {
  const navigate = useNavigate();
  const { backendURI, setIsLogin } = useContext(AuthRoute);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendURI}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setIsLogin(true);
        Cookies.set("token", data.token, { expires: 60 });
        setTimeout(() => navigate("/admin/dashboard"), 1500);
      } else {
        toast.error(data.message || "Incorrect email or password.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="auth-container">
      <div className="brand-name">
        <h1>
          Admin Login
        </h1>
      </div>
      <div className="auth-img">
      </div>
      <div className="auth-box">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                autoComplete="new-email"
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="new-password"
              />
            </div>

            <div className="forget-pass">
              <Link to="/forget-password">
                <p>Forgot your password?</p>
              </Link>
            </div>

            <button type="submit" className="submit-btn">
              <p>LOGIN</p>
              <span className="btn-overlay"></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
