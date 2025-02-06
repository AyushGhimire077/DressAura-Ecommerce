import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { AuthRoute } from "../../context/authContext";
import toast from "react-hot-toast";

const Home = () => {
  const [isBlurred, setIsBlurred] = useState(true);
  const { checkVerified } = useContext(AuthRoute);

  useEffect(() => {
    if (checkVerified === true) {
      toast.success("Please login again to make changes");
    }
  }, [checkVerified]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlurred(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const hoverText = ({ text }) => {
    return (
      <h2 className={`hover-text ${isBlurred ? "blurred" : ""}`}>
        {text.split("").map((char, index) => (
          <span key={index} className="hover-letter">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
    );
  };

  return (
    <>
      <div className="hero-page">
        <Navbar />
        <div className="hero">
          <div className="hero-sec">
            <div className="image"></div>
            <div className="info">
              {hoverText({ text: "DARE" })}
              {hoverText({ text: "TO BE" })}
              {hoverText({ text: "DIFFERENT" })}
              <div className="p-info">
                <p className={isBlurred ? "blurred" : ""}>
                  Dare to be different with a style that <br />{" "}
                  <b>Dress Aura</b> provides.
                </p>
              </div>
              <div className={`latest-pro ${isBlurred ? "blurred" : ""}`}>
                <span>See the latest products</span>
              </div>
            </div>
            <div className="company-name">
              <h1 className={isBlurred ? "blurred" : ""}>
                Dres Aura <FontAwesomeIcon icon={faStarHalf} />
              </h1>
            </div>
          </div>
          <div className="side-img"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
