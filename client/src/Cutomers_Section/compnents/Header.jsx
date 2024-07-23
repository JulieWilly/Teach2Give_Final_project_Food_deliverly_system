import "./global.css";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import food_logo from '../../assets/food_logo.avif'
import React, { useState } from "react";
import icon from "../../assets/react.svg";
import { NavLink } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState();
  const [openSearch, setOpenSearch] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="header_sect">
      <div className="header">
        <div
          className="logo"
          onClick={() => {
            navigate("/home");
          }}
        >
          <div className="foodie_logo">
            <img src={food_logo} alt="" />
          </div>
          <h1>Foodiee</h1>
        </div>

        <div className="left">
          <nav>
            <div className="search" onClick={() => setOpenSearch(!openSearch)}>
              {openSearch && (
                <input
                  onClick={() => setOpenSearch(!openSearch)}
                  type="text "
                  placeholder="Search product"
                />
              )}
              <FaSearch className="_icons" />
            </div>

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
