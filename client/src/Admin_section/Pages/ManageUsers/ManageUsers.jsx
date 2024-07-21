import "./manageUser.css";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import img from "../../../assets/react.svg";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";

const ManageUsers = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        setLoading(true);
        setError(false);
        const customers = await axios
          .get(`${VITE_API_URL_BASE}/customers`, { withCredentials: true })
          .catch((error) => console.log(error));

        setCustomer(customers.data.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, []);
  return (
    <div className="customers_sect">
      {customer.length > 0 ? (
        customer.map((customers, key) => (
          <div className="customer" key={key}>
            <div className="cust_img">
              <img src={img} alt="" />
            </div>
            <div className="cust_details">
              <h2> {customers.custName}</h2>
              <div className="icons">
                {<MdOutlineEmail className="icon" />}
                <p>{customers.custEmail}</p>
              </div>
              <div className="icons">
                {<FaPhoneAlt className="icon" />}
                <p>{customers.custPhoneNumber}</p>
              </div>
              <div className="icons">
                {<CiLocationOn className="icon" />}
                <p>{customers.custLocation}</p>
              </div>
            </div>
            <div className="buttons">
              <button>Approve</button>
              <button>Reject</button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading more data....</p>
      )}
    </div>
  );
};

export default ManageUsers;
