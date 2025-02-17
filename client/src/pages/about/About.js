import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./about.css";

const About = () => {
  return (
    <div className="about-container">
      <Navbar />
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>Your Company Name</strong>! We are committed to
          providing high-quality products that enhance your lifestyle. Our
          mission is to bring innovation and excellence to every customer.
        </p>

        <h2>Our Mission</h2>
        <p>
          We strive to deliver the best products with the highest quality and
          exceptional customer service. Every item we offer is carefully curated
          to meet the needs of our customers.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>✔ Premium Quality Products</li>
          <li>✔ 100% Customer Satisfaction</li>
          <li>✔ Fast & Reliable Shipping</li>
          <li>✔ Dedicated Support Team</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          Have questions? We’d love to hear from you! Reach out at:
          <br />
          📧 Email: support@dressaura.com
          <br />
          📞 Phone: +123-456-7890
        </p>
      </div>
    </div>
  );
};

export default About;
