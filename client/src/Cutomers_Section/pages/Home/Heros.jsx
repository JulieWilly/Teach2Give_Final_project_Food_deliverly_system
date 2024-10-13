import "./home.css";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import React from "react";
import foods from "../../../assets/foods.jpg";

const Heros = () => {
  const navigate = useNavigate();
  return (
    <div className="herosSect">
      <div className="heros_left">
        <h1>Delicious Food delivery</h1>
        <p>
          Order your favorite meals from top-rated restaurants and have them
          delivered to your doorstep.
        </p>

        <div className="button">
          <Link to={"/cart"}>
            <button>Order Now</button>
          </Link>
          <button>Explore Menu</button>
        </div>
      </div>
      <div className="heros_right">
        <img src={foods} alt="" />
      </div>
    </div>
  );
};

export default Heros;
