import "./global.css";
import React from "react";

const Title = ({ title, description }) => {
  return (
    <div className="title_section">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Title;
