import React, { useEffect, useState } from "react";
import icon from "../../../src/assets/food_logo.avif";
import "./global.css";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../configs/configs";

const AdminHeader = () => {
  const [name, setName] = useState([]);
  // getAdminName =
  const getAdminName = async () => {
    try {
      const getName = await axios
        .get(`${VITE_API_URL_BASE}/customers`, {
          withCredentials: true,
        })
        .catch((error) => console.log(error));

      setName(getName.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminName();
  }, []);
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
            <img src={icon} alt="Company logo," />
          </div>

          <h3>Admin{name.custName}</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
