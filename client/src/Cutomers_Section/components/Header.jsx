import "./global.css";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import food_logo from "../../assets/food_logo.avif";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../configs/configs";
import createStore from "../../Store/userStore";

const Header = () => {
  const [open, setOpen] = useState();
  const [openSearch, setOpenSearch] = useState(false);
  const [image, setImage] = useState([]);
  const navigate = useNavigate();
  const user = createStore((state) => state.user);
  console.log( 'user', user)
  const userName = user.data.custName;
  const firstCharacter = getFirstCharacter(userName);

  // GET CUSTOMER PHOTO
  useEffect(() => {
    const getAvatar = async () => {
      try {
        const userID = user.data.cust_id;
        const getAvatar = await axios
          .get(`${VITE_API_URL_BASE}/${userID}`, { withCredentials: true })
          .catch((error) => console.log(error));
        console.log("customer", getAvatar);
        setImage(getAvatar.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAvatar();
  }, []);

  return (
    <div className="header_sect">
      <div className="header">
        <div
          className="logo"
          onClick={() => {
            navigate("/users_home");
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
                {image && image.custAvatar == null ? (
                  <div className="_char" onClick={(e) => setOpen(!open)}>
                    {firstCharacter}
                  </div>
                ) : (
                  <img
                    onClick={(e) => setOpen(!open)}
                    src={image.custAvatar}
                    alt=""
                  />
                )}
              </div>
              {open && <Profile />}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

const getFirstCharacter = (name) => {
  return name.charAt(0).toUpperCase();
};

export default Header;
