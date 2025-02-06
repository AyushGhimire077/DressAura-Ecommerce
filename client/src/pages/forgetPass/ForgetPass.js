import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import img from "../../assets/auth-img.avif";
import axios from "axios";
import { AuthRoute } from "../../context/authContext";
import "./forget.css";

const ForgetPass = () => {
  const { backendURI, userData } = useContext(AuthRoute);
  const userId = userData?.id;

  const [isReset, setIsReset] = useState(true);
  const [isSucesss, setIsSucess] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [ott, setOtt] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post(
        `${backendURI}/api/auth/change-password`,
        { newPassword, oldPassword },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message || "Try again later");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleResetRequest = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      const { data } = await axios.post(
        `${backendURI}/api/auth/send-reset-ott`,
        { email }
      );
      if (data.success) {
        toast.success(data.message);
        setIsSucess(true);
      } else {
        toast.error(data.message || "Try again later");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleVerifyOtt = async (e) => {
    e.preventDefault();
    if (!ott || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      const { data } = await axios.post(
        `${backendURI}/api/auth/reset-password`,
        {
          ott,
          password,
        },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message || 'Password change sucessfully');
        navigate('/')
      } else {
        toast.error(data.error || 'Invalid ott or something wrong happen');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!userId) {
      setIsReset(false);
    }
  },[]);

  return (
    <div className="forgot-page">
      <div className="for-img">
        <img src={img} alt="Forgot Password" />
      </div>
      <div className="forget-container">
        <div className="form-container">
          {!isSucesss ? (
            <div className={`form-section ${!isReset ? "active" : "inactive"}`}>
              <h1>Forgot Password?</h1>
              <p>Enter your email to receive a reset link.</p>
              <form onSubmit={handleResetRequest}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Send Reset Link</button>
              </form>
              {userId ? (
                <p className="switch-text">
                  Remember your password?
                  <button
                    className="switch-btn"
                    onClick={() => setIsReset(true)}
                  >
                    Change Password
                  </button>
                </p>
              ) : null}
            </div>
          ) : (
            <div className={`form-section ${!isReset ? "active" : "inactive"}`}>
              <h1>Enter OTT and New Password</h1>
              <p>Enter OTT</p>
              <form onSubmit={handleVerifyOtt}>
                <input
                  type="text"
                  placeholder="Enter your Ott"
                  value={ott}
                  onChange={(e) => setOtt(e.target.value)}
                  required
                />
                <input
                  type="password"
                  value={password}
                  placeholder="Enter you new password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
              {userId ? (
                <p className="switch-text">
                  Remember your password?
                  <button
                    className="switch-btn"
                    onClick={() => setIsReset(true)}
                  >
                    Change Password
                  </button>
                </p>
              ) : null}
            </div>
          )}

          <div className={`form-section ${isReset ? "active" : "inactive"}`}>
            <h1>Change Password</h1>
            <p>Secure your account with a new password</p>
            <form onSubmit={handlePasswordChange}>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit">Update Password</button>
            </form>
            <p className="switch-text">
              Need to reset again?
              <button className="switch-btn" onClick={() => setIsReset(false)}>
                Reset Password
              </button>
            </p>
          </div>
        </div>

        <button onClick={() => navigate("/")} className="go-back">
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default ForgetPass;
