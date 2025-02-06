import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthRoute = createContext();

export const AuthProvider = ({ children }) => {
  const backendURI =
    process.env.REACT_APP_BACKEND_URI || "http://localhost:4000";

  const [isLogin, setIsLogin] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [userData, setUserData] = useState(null);
  const [checkVerified, setCheckVerified] = useState(false)

  const checkToken = () => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
          setIsLogin(true);
          setUserData({
            email: decoded.email,
            number: decoded.number,
            id: decoded.id,
            name: decoded.name,
            isVerified: decoded.isVerified,
            role: decoded.role,
          });
        } else {
          Cookies.remove("token");
          setIsLogin(false);
          setUserData(null);
        }
      } catch (error) {
        console.error("Invalid token", error);
        setIsLogin(false);
        setUserData(null);
      }
    } else {
      setIsLogin(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkToken();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthRoute.Provider
      value={{
        isLogin,
        setIsLogin,
        backendURI,
        setShowInfo,
        showInfo,
        setUserData,
        userData,
        checkVerified,
        setCheckVerified,
      }}
    >
      {children}
    </AuthRoute.Provider>
  );
};
