import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { AuthRoute } from "../../context/authContext";
import FeatureBox from "../../components/featureBox/featureBox";
import About from "../../components/about/About";
import axios from "axios";

const Home = ({ aboutRef }) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const { backendURI, isLogin } = useContext(AuthRoute);

  const trackVisit = async () => {
    try {
      if (isLogin) {
        const { data, status } = await axios.post(
          `${backendURI}/api/auth/track-visit`,
          {},
          { withCredentials: true }
        );
        console.log("Backend Response Status:", status);
        console.log("Response from backend:", data);
      }
    } catch (error) {
      console.error("Error tracking visit:", error);
    }
  };

  useEffect(() => {
    trackVisit();
  }, [isLogin]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlurred(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const hoverText = ({ text }) => (
    <h2 className={`hover-text ${isBlurred ? "blurred" : ""}`}>
      {text.split("").map((char, index) => (
        <span key={index} className="hover-letter">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  );

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

      <FeatureBox />
      <About ref={aboutRef} />
    </>
  );
};

export default Home;
