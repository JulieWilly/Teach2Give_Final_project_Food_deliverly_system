import React from "react";
import "./dashboard.css";
import Footer from '../../../Cutomers_Section/compnents/Footer'
import { FaCartPlus } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { IoFastFoodSharp } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
const Dashboard = () => {
  return (
    <div>
      <h2 className="res">Welcome back !! {"Admin name"}</h2>
      <div className="dashboardsect">
        <div className="orders">
          <div className="_orders">
            <FaCartPlus className="icon" />
            <h2>Orders (23)</h2>
          </div>
          <div className="_orders">
            <LuUsers className="icon" />
            <h2>Customers (23)</h2>
          </div>
          <div className="_orders">
            <IoFastFoodSharp className="icon" />
            <h2>Products available (23)</h2>
          </div>
          <div className="_orders">
            <CiDeliveryTruck className="icon" />
            <h2>Products delivered (23)</h2>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;
