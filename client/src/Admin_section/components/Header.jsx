import React from "react";
import { Link } from "react-router-dom";
import icon from '../../../src/assets/react.svg'
import "./global.css";

const Header = () => {
  return (
    <div className="admin_header_sect">
      <div className="header_sect">
        <div className="left">
          <img src={icon} alt="Company logo," />
          <h1>Foodies</h1>
        </div>
        <div className="right">
          
            <img src={icon} alt="" />
       
          <h3>Admin name here</h3>
        </div>
      </div>
    </div>
  );
  
};

export default Header;
