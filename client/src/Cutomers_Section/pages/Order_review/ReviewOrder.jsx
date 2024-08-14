import React, { useEffect, useState } from 'react';
import Banner from '../../compnents/Banner';
import Title from '../../compnents/Title';
import { useFormik } from 'formik';
import "./reviewOrder.css";
import img from '../../../assets/food2.jpg'
import * as Yup from 'yup'
import axios from 'axios';
import { VITE_API_URL_BASE } from '../../../configs/configs';
import createStore from '../../../Store/userStore';


const ReviewOrder = () => {
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [orderItems, setOrderItems] = useState([])
  const { totalAmount, cartItems } = createStore();

  // GET ORDER ITEMS.
  const getOrderItems = async () => {
    try{
      setError(false)
      setLoading(true)
      const id = "e8fb6a0f-8be8-4a00-ab71-97ca04ae8856";

      const getItems = await axios
        .get(`${VITE_API_URL_BASE}/orders/items/${id}`, {
          withCredentials: true,
        })
        .catch((error) => console.log(error));

      setOrderItems(getItems.data.data)
      console.log(getItems)
      
    } catch(error){
      console.log(error)
      setError(error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
getOrderItems()
  }, [])
  const handleSubmit = (values) => {
    alert('done')
    console.log(values)
  }
    const formValidation = Yup.object({
      paymentMethod: Yup.string().required("Payment metthod required."),
      amount: Yup.number().required("Amount paid required."),
      phoneNumber: Yup.number().required("Phone number required."),
    });
    const formik = useFormik({
      initialValues: {
        paymentMethod: "",
        phoneNumber: "",
        amount:''
      },
      onSubmit: handleSubmit,
      validationSchema: formValidation
    });
    return (
      <div>
        <Banner
          title={"Review Order"}
          desc={"Review your order details before checking out."}
        />
        <div className="summary">
          <div className="orderDetails">
            <div className="productSummary">
              <Title title={"Products Summmary"} />
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
                  {orderItems && orderItems.length > 0 ? (
                    orderItems.map((orderItem, key) => (
                      <tbody key={key}>
                        <tr className="_row">
                          <td>
                            <div className="_product">
                              <h4>{orderItem.order_item_name}</h4>
                            </div>
                          </td>
                          <td>$ {orderItem.itemPrice}</td>
                          <td>
                            <p>{orderItem.orderQuantity}</p>
                          </td>
                          <td> $ {orderItem.itemTotal}</td>
                        </tr>
                      </tbody>
                    ))
                  ) : (
                    <p>You have no items to order yet.</p>
                  )}
                </table>
              </div>
            </div>
            <div className="payments">
              <Title title={"Payments"} />
            </div>
          </div>
          <div className="billing_details_right">
            <table>
              <tr>
                <th>
                  <p>Products total</p>
                </th>
                <td>
                  <p>${totalAmount}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <p>Delivery fee</p>
                </th>
                <td>
                  <p>
                    <span>${12}</span> now {"free"}
                  </p>
                </td>
              </tr>
              <tr>
                <th>
                  <p>Total amount</p>
                </th>
                <td>
                  <p>$ 12000</p>
                </td>
              </tr>
            </table>
            <div className="buttons">
              <button>
                {loading ? "Signing in. Please wait ..." : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}



export default ReviewOrder;