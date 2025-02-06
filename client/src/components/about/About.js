import React, { useEffect, useRef } from "react";
import "./about.css";

const About = () => {
  const aboutRef = useRef(null);

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
      { threshold: 0.5 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <div className="about">
      <hr/>
      <div className="about-container" ref={aboutRef}>
        <div className="about-head">
          <h1>Why Choose Us?</h1>
        </div>
        <div className="abt-explain">
          <div className="explain-head">
            <h1>Our Advantages</h1>
            <ul>
              <li>
                <strong>Fast Delivery:</strong> We ensure quick delivery of your
                orders.
              </li>
              <li>
                <strong>24/7 Support:</strong> Our team is always here to assist
                you.
              </li>
              <li>
                <strong>Quality Products:</strong> We offer only the best,
                reliable products.
              </li>
              <li>
                <strong>Secure Payments:</strong> Your transactions are always
                safe with us.
              </li>
            </ul>
          </div>
          <div className="about-details">
            <h2>About Us</h2>
            <p>
              We are dedicated to offering excellent products and services.<br/> Our
              mission is to provide top-quality products and<br/> ensure complete
              customer satisfaction.
            </p>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default About;
