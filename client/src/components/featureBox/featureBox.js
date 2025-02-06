import React, { useEffect, useRef } from "react";
import "./feature.css";
import images from "../../assets/assects";

const FeatureBox = () => {
  const names = [
    "FAST DELIVERY",
    "CUSTOMER SERVICE",
    "EASY RETURN",
    "TRACK LOCATION",
    "SECURE PAYMENT",
  ];

  const featureRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    featureRefs.current.forEach((feature) => {
      observer.observe(feature);
    });

    return () => {
      featureRefs.current.forEach((feature) => {
        observer.unobserve(feature);
      });
    };
  }, []);

  return (
    <div className="feature-box">
      <div className="feature-container">
        <h1>Our Features</h1>
        <div className="features">
          {images.map((image, index) => {
            return (
              <div
                key={index}
                ref={(el) => (featureRefs.current[index] = el)}
                className="feature"
              >
                <div className="fea-img">
                  <img src={image} alt="img" />
                </div>
                <div className="fea-name">
                  <h1>{names[index]}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureBox;
