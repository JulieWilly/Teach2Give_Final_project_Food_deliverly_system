import Banner from "../../compnents/Banner";
import Title from "../../compnents/Title";
import "./cart.css";
import React, { useState } from "react";
import icon from "../../../assets/foods.jpg";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Footer from "../../compnents/Footer";
const Cart = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Banner
        title={"Cart section."}
        desc={"This page contains the cart items."}
      />
      <Title title={"Your orders"} />
      <div className="order_sect">
        <div className="orders_desc">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>SubTotal</th>
              </tr>
            </thead>

            <tr>
              <td>
                <div className="_product">
                  <div className="product_img">
                    <img src={icon} alt="Product image" />
                  </div>
                  <h4>Product name</h4>
                </div>
              </td>
              <td>$ 12</td>
              <td>
                <p>3</p>
              </td>
              <td>
                <div className="del">
                  ${12}
                  <MdDeleteForever className="icon" />
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div className="orderstotal">
          <h2>Cart Totals</h2>
          <div className="sub_totals">
            <table>
              <thead>
                <tr>
                  <th>
                    <h3>Sub total</h3>
                  </th>
                  <td>
                    <p>$ {300}</p>
                  </td>
                </tr>
                <tr>
                  <th>
                    <h3>Total</h3>
                  </th>
                  <td>
                    <p>$ {300}</p>
                  </td>
                </tr>
              </thead>
            </table>
            <div className="buttons">
              <button
                onClick={() => {
                  navigate("/billing");
                }}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
