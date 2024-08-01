import React, { useEffect, useState } from "react";
import icon from "../../../src/assets/food_logo.avif";
import "./global.css";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../configs/configs";
import createStore from "../../Store/userStore";
import { useNavigate } from "react-router-dom";
const AdminHeader = () => {
  const navigate = useNavigate();
  const user = createStore((state) => state.user);
  const [image, setImage] = useState([]);
  const name = user.data.custName;

  const firstCharacter = getFirstCharacter(name);

  useEffect(() => {
    const getAvatar = async () => {
      try {
        const userID = user.data.cust_id;
        const getAvatar = await axios
          .get(`${VITE_API_URL_BASE}/${userID}`, { withCredentials: true })
          .catch((error) => console.log(error));
        setImage(getAvatar.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAvatar();
  }, []);

  // display user name first character.

  return (
    <div className="admin_header_sect">
      <div className="header_sect">
        <div className="left">
          <div className="_logo">
            <img src={icon} alt="Company logo," />
          </div>
          <h1>Foodies</h1>
        </div>
        <div className="right">
          <div className="_logo">
            {image == null ? (
              <img src="" alt="Company logo," />
            ) : (
              <div className="_char">{firstCharacter}</div>
            )}
          </div>

          <h3 className="adminName">{user.data.custName}</h3>
        </div>
      </div>
    </div>
  );
};

const getFirstCharacter = (name) => {
  return name.charAt(0).toUpperCase();
};
export default AdminHeader;
