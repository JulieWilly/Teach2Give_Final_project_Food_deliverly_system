import React from "react";
import Header from "../../compnents/Header";
import Heros from "./Heros";
import Products from "./Products";
import Reviews from "./Reviews";
const Home = () => {
  return (
    <div>
      <Heros />
      <Products />
      <Reviews />
    </div>
  );
};

export default Home;
