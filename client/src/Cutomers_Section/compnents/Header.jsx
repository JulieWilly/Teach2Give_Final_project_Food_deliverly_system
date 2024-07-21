import "./global.css";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { BsCake } from "react-icons/bs";
import React from "react";
import icon from "../../assets/react.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header_sect">
      <div className="header">
        <NavLink to={'/'}>
          <div className="logo">
            <img src={icon} alt="" />
            <h1>Foodiee</h1>
          </div>
        </NavLink>
        <div className="left">
          <NavLink to={"/search"}>
            <FaSearch />
          </NavLink>

          <NavLink to={"/cart"}>
            <FaCartPlus />
          </NavLink>
          <NavLink to={"/profile"}>
            <FaRegUser />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
