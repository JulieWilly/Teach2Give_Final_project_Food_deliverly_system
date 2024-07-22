import React from "react";
import "./order.css";
import Footer from "../../../Cutomers_Section/compnents/Footer.jsx";
import ordersData from "../../Data/ordersData.js";
const Orders = () => {
  return (
    <>
      <div className="orders_sect">
        {ordersData.map((order, ket) => (
          <div className="order">
            <div className="order_img">
              <img src={order.orderImg} alt="" />
            </div>
            <div className="order_desc">
              <h2>{order.orderName}</h2>
              <p className="p">{order.orderStatus}</p>
              <p className="p">{order.totalAmt}</p>
              <div className="buttons">
                <button className="btn_1">Approve</button>
                <button className="btn_2">Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </>
  );
};

export default Orders;
