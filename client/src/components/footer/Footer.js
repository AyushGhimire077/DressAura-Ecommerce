import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="abt-company">
          <h1>THE FISH BOWL</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
            Ea eaque veritatis saepe obcaecati ipsum esse <br />
            atque deleniti totam unde id? Odio omnis quidem culpa. <br />
            Hic expedita eos ipsam doloremque assumenda?
          </p>
        </div>
        <div className="abt-contact">
          <ul>
            <li>Connect Us</li>
            <li>Help</li>
            <li>Know More</li>
            <li>Customer Service</li>
          </ul>
        </div>
        <div className="abt-more">
          <div className="soc-ic">
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faXTwitter} />
          </div>
          <div className="about-more">
            <span>
              <FontAwesomeIcon icon={faLocationDot} />
              <p>
                Biratnagar 12 - Morang Nepal
              </p>
            </span>

            <span>
              <FontAwesomeIcon icon={faPhone} />
            <p>+977 9810534413</p>
            </span>

            <span>
              <FontAwesomeIcon icon={faEnvelope} />
            <p>supporeaura@gmail.com</p>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
