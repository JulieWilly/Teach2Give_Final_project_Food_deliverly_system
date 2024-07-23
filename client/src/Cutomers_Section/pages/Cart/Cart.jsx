import Banner from "../../compnents/Banner";
import Title from "../../compnents/Title";
import "./cart.css";
import React, { useEffect, useState } from "react";
import icon from "../../../assets/foods.jpg";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../compnents/Footer";
import { VITE_API_URL_BASE } from "../../../configs/configs";
const Cart = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setloading] = useState();
  const [cart, setCart] = useState();

  //fetch products added to the cart
  const toCart = async () => {
    try {
      const cartItems = await axios
        .get(`${VITE_API_URL_BASE}/products/products`)
        .catch((error) => console.log(error));
      const approvedToCart = cartItems.data.data
       const approvedItems = approvedToCart.filter(
         (item) => item.addedToCart === true
       );
        setCart(approvedItems);
     
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    toCart();
  }, []);
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
            {cart && cart.length > 0 ? (
              cart.map((cartItem, key) => (
                <tbody key={key}>

                  <tr className="_row">
                    <td>
                      <div className="_product">
                        <div className="product_img">
                          <img src={cartItem.productImg} alt="Product image" />
                        </div>
                        <h4>{cartItem.productName}</h4>
                      </div>
                    </td>
                    <td>$ {cartItem.productPrice}</td>
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
        
                </tbody>
              ))
            ) : (
              <p>Loading cart more cart items.....</p>
            )}
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
