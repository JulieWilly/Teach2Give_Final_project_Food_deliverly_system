import "./global.css";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { BsCake } from "react-icons/bs";
import React, { useState } from "react";
import icon from "../../assets/react.svg";
import { NavLink } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState()
  const navigate = useNavigate()

  return (
    <div className="header_sect">
      <div className="header">
       
          <div className="logo" onClick={() => {navigate('/home')}}>
            <img src={icon} alt="" />
            <h1>Foodiee</h1>
          </div>
       
        <div className="left">
          <nav>
            <NavLink to={"/search"}>
              <FaSearch className="_icons" />
            </NavLink>

            <NavLink to={"/cart"}>
              <FaCartPlus className="_icons" />
            </NavLink>
            <div className="user_profile">
              <div className="img">
                <img onClick={(e) => setOpen(!open)} src={icon} alt="" />
              </div>
              {open && <Profile />}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
