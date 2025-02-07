import React, { useContext, useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./user.css";
import { AuthRoute } from "../../context/authContext";
import axios from "axios";
import Cookies from "js-cookie";
import {Link, useNavigate} from 'react-router-dom'

const UserAcc = () => {
  const { setIsLogin, isLogin, backendURI, userData } = useContext(AuthRoute);
  const [loading, setLoading] = useState(false);
  const [changeProfile, setChangeProfile] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${backendURI}/api/auth/logout`);
      console.log(data);

      if (data.success) {
        Cookies.remove("token");
        navigate('/auth-page')
        setLoading(false);
        setIsLogin(false);
      } else {
        alert("Error while logging out. Try again later");
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

    useEffect(() => {
      const userContainer = document.querySelector(".user-container");
      if (userContainer) {
        userContainer.classList.add("entered"); 
      }
      console.log(userData);
      
    }, []);

  if (!isLogin) return null;

  return (
    <div className="user-container">
      <div className="user-acc">
        <div className="per-info card">
          <div
            className="user-profile"
            onClick={() => setChangeProfile(!changeProfile)}
          >
            {!changeProfile ? (
              <FontAwesomeIcon icon={faUser} className="user-img" />
            ) : (
              <div className="profile-upload">
                <span>+</span>
              </div>
            )}
          </div>
          <div className="user-name">
            <h2>{userData?.name}</h2>

            <div
              className="verified-badge"
              style={{ color: userData?.isVerified ? "green" : "#B1C29E" }}
            >
              <FontAwesomeIcon
                icon={userData?.isVerified ? faCheckCircle : faTimesCircle}
              />

              {userData?.isVerified ? (
                <span>Verified</span>
              ) : (
                <Link
                  to="/verify-email"
                  style={{ textDecoration: "none", color: "#B1C29E" }}
                >
                  <span>Verify Now</span>
                </Link>
              )}
            </div>
          </div>
          <div className="user-detail">
            <ul>
              <li>
                <FontAwesomeIcon icon={faPhone} />
                <span>{userData?.number}</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>{userData?.email}</span>
              </li>
            </ul>
          </div>
          <div className="more-info">
            <Link to="/forget-password">
              <button className="action-btn">Change Password</button>
            </Link>
            <button className="action-btn log-out" onClick={handleLogout}>
              {loading ? "Logging out..." : "Log Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAcc;
