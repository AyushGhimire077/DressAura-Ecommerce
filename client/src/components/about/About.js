import React, { useEffect, useRef } from "react";
import "./about.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
      { threshold: 0.4 }
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

  const location = useLocation()

  return (
    <div className="about">
      {location.pathname === "/" ? null : (
        <Link to="/">
          <FontAwesomeIcon
            style={{ padding: "30px" }}
            size="xl"
            icon={faArrowLeft}
          />
        </Link>
      )}

      <div className="about-container" ref={aboutRef}>
        <div className="about-head">
          <h1>About Us</h1>
        </div>

        <div className="abt-explain">
          <div className="explain-head">
            <h1>Our Mission</h1>
            <p>
              We aim to provide top-quality products with exceptional customer
              service. <br />
              Your satisfaction is our highest priority.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="abt-explain">
          <div className="explain-head">
            <h1>Our Core Values</h1>
            <ul>
              <li>
                <strong>Quality First:</strong> Only the best products for our
                customers.
              </li>
              <li>
                <strong>Customer Commitment:</strong> We value your trust and
                loyalty.
              </li>
              <li>
                <strong>Innovation:</strong> Continuously improving for a better
                experience.
              </li>
            </ul>
          </div>
        </div>

        <div className="abt-explain">
          <div className="explain-head">
            <h1>Join Us Today!</h1>
            <p>Be a part of our growing community and experience excellence.</p>
            <button className="cta-button">Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
