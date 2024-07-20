import React from 'react';
import './order.css'
import ordersData from '../../Data/ordersData.js';
const Orders = () => {
    return (
      <div className="orders_sect">
        {ordersData.map((order, ket) => (
          <div className="order">
            <div className="order_img">
              <img src={order.orderImg} alt="" />
            </div>
            <div className="order_desc">
              <h2>{order.orderName}</h2>
              <p>{order.orderStatus}</p>
              <p>{order.totalAmt}</p>
              <div className="buttons">
                <button>Approve</button>
                <button>Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}



export default Orders;