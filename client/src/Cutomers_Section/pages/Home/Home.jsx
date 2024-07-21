import React from "react";
import Header from "../../compnents/Header";
import Heros from "./Heros";
import Products from "./Products";
import Reviews from "./Reviews";
import Profile from "../Profile/Profile";
import Footer from "../../compnents/Footer";
import './home.css'
const Home = () => {
  return (
    <div  className="home">
      
      <Heros />
      <Products />
      <Reviews />
      <Footer/>
    </div>
  );
};

export default Home;
