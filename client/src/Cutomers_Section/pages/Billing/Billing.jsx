import './billing.css'
import React from 'react';
import Banner from '../../compnents/Banner'
import Title from '../../compnents/Title'
import {useFormik} from 'formik'
import * as Yup from 'yup'


const Billing = () => {
    const handleSubmit = () => {

    }
    const formValidation = Yup.object({
      customerAddress: Yup.string().required("County name required."),
      amount: Yup.number()
        .required("Amount paid required.")
        .integer("Password should be a number."),
      city: Yup.string().required("City name required."),
      state: Yup.string().required("State name required."),
      zipcode: Yup.string().required("Zip codes required."),
      paymentMethod: Yup.string().required("Payment method required."),
      paymentStatus: Yup.string().required("Payment status required."),
    });
    const formik = useFormik({
      initialValues: {
        customerAddress: "",
        city: "",
        state: "",
        zipcode: "",
        paymentMethod: "",
        amount: "",
        paymentStatus:''
      },
      onSubmit: handleSubmit,
      validationSchema: formValidation,
    });
    return (
      <div>
        <Banner
          title={"Check out yout products."}
          desc={
            "Make full payment of the ordered items and request for delivery"
          }
        />
        <Title title={"Enter billing detaails below."} />
        <div className="billing_details">
          <div className="address_details_left">
            <form className="form" onSubmit={formik.handleSubmit}>
              <div className="inputs">
                <label htmlFor="customerAddress">County name:</label>
                <input
                  type="text"
                  placeholder="County name"
                  name="customerAddress"
                  value={formik.values.customerAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.customerAddress &&
                  formik.errors.customerAddress && (
                    <p>{formik.errors.customerAddress}</p>
                  )}
              </div>

              <div className="inputs">
                <label htmlFor="state">State:</label>

                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.state && formik.errors.state && (
                  <p>{formik.errors.state}</p>
                )}
              </div>

              <div className="inputs">
                <label htmlFor="city">City / Town:</label>

                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city && (
                  <p>{formik.errors.city}</p>
                )}
              </div>

              <div className="inputs">
                <label htmlFor="zipcode">Zip code:</label>

                <input
                  type="text"
                  placeholder="Zip Codes"
                  name="zipcode"
                  value={formik.values.zipcode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.zipcode && formik.errors.zipcode && (
                  <p>{formik.errors.zipcode}</p>
                )}
              </div>
            </form>
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
            <Title title={"Payments"} />
            <form onSubmit={formik.handleSubmit}>
              <div className="inputs">
                <label htmlFor="paymentMethod">Payment method:</label>

                <select name="paymentMethod" id="1">
                    <option value="Bank">Bank</option>
                    <option value="M-Pesa">M-Pesa</option>
                    <option value="Debit_card">Debit card</option>
                </select>
                <input
                  type="text"
                  placeholder="Payment Method"
                  name="paymentMethod"
                  value={formik.values.paymentMethod}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.paymentMethod &&
                  formik.errors.paymentMethod && (
                    <p>{formik.errors.paymentMethod}</p>
                  )}
              </div>

              <div className="inputs">
                <label htmlFor="amount">Amount:</label>

                <input
                  type="number"
                  placeholder="Amount"
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.amount && formik.errors.amount && (
                  <p>{formik.errors.amount}</p>
                )}
              </div>
              <div className="inputs">
                <label htmlFor="paymentStatus">Payment Status:</label>
                <input
                  type="text"
                  placeholder="Payment status"
                  name="paymentStatus"
                  value={formik.values.paymentStatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.paymentStatus &&
                  formik.errors.paymentStatus && (
                    <p>{formik.errors.paymentStatus}</p>
                  )}
              </div>

              <div className="buttons">
                <button>Place order</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}



export default Billing;