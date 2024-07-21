import "./home.css";

import React from "react";
import icon from "../../../assets/react.svg";

const Heros = () => {
  return (
    <div className="heros_sect">
      <div className="heros_left">
        <h1>Delicious Food delivery</h1>
        <p>
          Order your favorite meals from top-rated restaurants and have them
          delivered to your doorstep.
        </p>

        <div className="button">
          <button>Order Now</button>
          <button>Explore Menu</button>
        </div>
      </div>
      <div className="heros_right">
        <img src={icon} alt="" />
      </div>
    </div>
  );
};

export default Heros;
