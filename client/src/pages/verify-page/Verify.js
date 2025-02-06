import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthRoute } from "../../context/authContext";
import axios from "axios";
import "./verify.css";

const Verify = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(0);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const { backendURI, userData, setCheckVerified } = useContext(AuthRoute);

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${backendURI}/api/auth/send-verify-ott`,
        {
          email,
          id: userData?.id,
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setOtpSent(true);
      } else {
        toast.error(data.message || "Error sending OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }

    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${backendURI}/api/auth/verify-email`,
        {
          otp,
          id: userData?.id,
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setCheckVerified(true);
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="verify-email">
      <h1>Email Verification</h1>

      {!otpSent ? (
        <form onSubmit={handleEmailSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <div>
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      <Link to="/auth-page">Back to Login</Link>
    </div>
  );
};

export default Verify;
