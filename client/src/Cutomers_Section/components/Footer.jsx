import "./global.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { ImLinkedin2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import React from "react";
import logo from "../../assets/food_logo.avif";
import { NavLink, Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <NavLink to={"/"}>
          <div className="logo">
            <div className="foodie_logo">
              <img src={logo} alt="" />
            </div>
            <h1>Foodiee</h1>
          </div>
        </NavLink>
      </div>
      <div className="socials">
        <Link target="blank" to={"https://x.com/"}>
          <FaXTwitter className="_icons" />
        </Link>
        <Link target="blank" to={"https://www.facebook.com/"}>
          <FaFacebookF className="_icons" />
        </Link>
        <Link
          target="blank"
          to={"https://www.linkedin.com/home/?originalSubdomain=ke"}
        >
          <ImLinkedin2 className="_icons" />
        </Link>
        <Link target="blank" to={"https://www.instagram.com/"}>
          <FaInstagram className="_icons" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
