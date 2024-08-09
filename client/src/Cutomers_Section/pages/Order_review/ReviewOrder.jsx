import React, { useState } from 'react';
import Banner from '../../compnents/Banner';
import Title from '../../compnents/Title';
import { useFormik } from 'formik';
import "./reviewOrder.css";
import img from '../../../assets/food2.jpg'
import * as Yup from 'yup'


const ReviewOrder = () => {
  const [loading, setLoading] = useState()

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
                  <tbody>
                    <tr className="_row">
                      <td>
                        <div className="_product">
                          <div className="product_img">
                            <img src={img} alt="Product image" />
                          </div>
                          <h4>{"Mugate na johi"}</h4>
                        </div>
                      </td>
                      <td>$ {12}</td>
                      <td>
                        <p>5</p>
                      </td>
                      <td>10</td>
                    </tr>
                  </tbody>
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
                  <p>Product name</p>
                </th>
                <td>
                  <p>$(12)</p>
                </td>
              </tr>
              <tr>
                <th>
                  <p>Sub total</p>
                </th>
                <td>
                  <p>$(100)</p>
                </td>
              </tr>
              <tr>
                <th>
                  <p>Total amount</p>
                </th>
                <td>
                  <p>$(12000)</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
}



export default ReviewOrder;