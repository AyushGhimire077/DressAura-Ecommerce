import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { AuthRoute } from "../../context/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import authImg from "../../assets/img-1.jpg";
import "./style.css";

const SocialIcons = () => (
  <div className="soc-icon">
    <div className="fol-us">
      <p>Follow us at</p>
    </div>
    <div className="icon">
      <FontAwesomeIcon icon={faFacebook} />
      <FontAwesomeIcon icon={faInstagram} />
      <FontAwesomeIcon icon={faXTwitter} />
    </div>
  </div>
);

const InputGroup = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
}) => (
  <div className="input-group">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  </div>
);

const Auth = () => {
  const navigate = useNavigate();
  const { backendURI, setIsLogin } = useContext(AuthRoute);
  const [isSwitched, setIsSwitched] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isSwitched) {
        const { data } = await axios.post(
          `${backendURI}/api/auth/login`,
          { email, password },
          { withCredentials: true }
        );
        if (data.success) {
          toast.success(data.message);
          setIsLogin(true);
          Cookies.set("token", data.token, { expires: 60 });
          setTimeout(() => navigate("/"), 1500);
        } else {
          toast.error(data.message || "Incorrect email or password.");
        }
      } else {
        const { data } = await axios.post(
          `${backendURI}/api/auth/register`,
          { name, email, password, number },
          { withCredentials: true }
        );
        if (data.success) {
          toast.success(
            data.message || "Registration successful! You can now login."
          );
          setTimeout(() => setIsSwitched(false), 1500);
        } else {
          toast.error(data.message || "Registration failed.");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="auth-container">
      <div className="brand-name">
        <h1>
          <Link to="/">द Dress Aura</Link>
        </h1>
      </div>
      <div className="auth-img">
        <img src={authImg} alt="img" />
      </div>
      <div className={`auth-box ${isSwitched ? "switched" : ""}`}>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <h2>{isSwitched ? "Sign Up" : "Sign In"}</h2>
            <SocialIcons />
            {isSwitched && (
              <InputGroup
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                autoComplete="new-name"
              />
            )}
            <InputGroup
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              autoComplete="new-email"
            />
            {isSwitched && (
              <InputGroup
                type="number"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Phone number"
                autoComplete="new-number"
              />
            )}
            <InputGroup
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="new-password"
            />
            {!isSwitched && (
              <div className="forget-pass">
                <Link to="/forget-password">
                  <p>Forgot your password?</p>
                </Link>
              </div>
            )}
            <button type="submit" className="submit-btn">
              <p>{isSwitched ? "REGISTER" : "LOGIN"}</p>
              <span className="btn-overlay"></span>
            </button>
          </form>
        </div>

        <div className="overlay-wrapper">
          <div className="overlay-content">
            <h2>{isSwitched ? "Welcome Back!" : "New Here?"}</h2>
            <p>
              {isSwitched
                ? "Login with your credentials"
                : "Create an account to get started"}
            </p>
            <button
              className="switch-btn"
              onClick={() => setIsSwitched(!isSwitched)}
            >
              {isSwitched ? "SIGN IN" : "SIGN UP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
