import React, { useEffect, useState } from "react";
import "./order.css";
import Footer from "../../../Cutomers_Section/components/Footer.jsx";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs.js";
import Title from "../../../Cutomers_Section/components/Title.jsx";
const Orders = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const findOders = async () => {
    try {
      const orders = await axios
        .get(`${VITE_API_URL_BASE}/orders/all/orders`, {
          withCredentials: true,
        })
        .catch((error) => console.log(error));
      console.log("orders", orders.data.data);
      setOrders(orders.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // delete an order
  const handleDelete = async (id) => {
    try {
      const deleteItem = await axios
        .delete(`${VITE_API_URL_BASE}/orders/${id}`, { withCredentials: true })
        .catch(console.log(error));
      console.log(deleteItem);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproval = async (order_id) => {
    try {
      const approveOrder = await axios
        .put(
          `${VITE_API_URL_BASE}/orders/${order_id}`,
          {
            orderStatus: true,
          },
          {
            withCredentials: true,
          },
        )
        .catch((error) => console.log(error));
      console.log("id", order_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findOders();
  }, []);
  return (
    <>
      <Title title={"Orders available"} />
      <div className="orders_sect">
        {orders &&
          orders.map((order, ket) => (
            <div className="order" key={ket}>
              {/* <div className="order_img">
                <img src={order.orderImg} alt="" />
              </div> */}
              <div className="order_desc">
                <h2>Order name: {order.orderName}</h2>
                <p className="p">No if items: {order.noOfItems}</p>
                <p className="p">
                  {order.orderStatus == false ? "Pending approval" : "Approved"}
                </p>
                <p className="p">Total amount: {order.totalAmount}</p>
              </div>
              <div className="buttons">
                {order && order.orderStatus == true ? (
                  <button
                    className="btn_2"
                    onClick={() => handleApproval(order.order_id)}
                  >
                    Approved
                  </button>
                ) : (
                  <button
                    className="btn2"
                    onClick={() => handleApproval(order.order_id)}
                  >
                    Approve
                  </button>
                )}

                <button
                  onClick={() => handleDelete(order.order_id)}
                  className="btn_1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
};

export default Orders;
