import "./global.css";
import React from "react";

const Banner = ({ title, desc }) => {
  return (
    <div className="banner_sect">
      <h1 style={{fontSize: '1.5rem'}}>{title}</h1>
      <p>{desc}</p>
    </div>
  );
};

export default Banner;
