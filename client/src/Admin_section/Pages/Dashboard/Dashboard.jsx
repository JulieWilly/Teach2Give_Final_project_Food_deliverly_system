import React, { useState, useEffect } from "react";
import "./dashboard.css";
import "../../components/global.css";
import Footer from "../../../Cutomers_Section/components/Footer";
import { FaCartPlus } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { IoFastFoodSharp } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import createStore from "../../../Store/userStore";

const Dashboard = () => {
  const user = createStore((state) => state.user);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [customer, setCustomer] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const getCustomers = async () => {
    try {
      setLoading(true);
      setError(false);
      const customers = await axios
        .get(`${VITE_API_URL_BASE}/customers`, { withCredentials: true })
        .catch((error) => console.log(error));

      setCustomer(customers.data.data);
      console.log(customers.data.data.length);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  //GET THE PRODUCTS COUNT.
  const findProducts = async () => {
    try {
      const products = await axios
        .get(`${VITE_API_URL_BASE}/products/products`, {
          withCredentials: true,
        })
        .catch((error) => console.log(error));
      setProducts(products.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get the number of orders.
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
  useEffect(() => {
    getCustomers();
    findProducts();
    findOders();
  }, []);
  return (
    <div>
      <h2 className="res adminName">Welcome back, {user.data.custName}</h2>
      <div className="dashboardsect">
        <div className="orders">
          <div className="_orders">
            <FaCartPlus className="icon" />
            <h2>
              Orders (
              {orders.length > 0 ? orders.length : "There are no orders yet."}){" "}
            </h2>
          </div>
          <div className="_orders">
            <LuUsers className="icon" />
            <h2>
              {" "}
              Customers (
              {customer.length > 0
                ? customer.length
                : "There are no customers yet!"}
              )
            </h2>
          </div>
          <div className="_orders">
            <IoFastFoodSharp className="icon" />
            <h2>
              Products available (
              {products.length > 0
                ? products.length
                : "There are no customers yet!"}
              )
            </h2>
          </div>
          <div className="_orders">
            <CiDeliveryTruck className="icon" />
            <h2>Products delivered (23)</h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
