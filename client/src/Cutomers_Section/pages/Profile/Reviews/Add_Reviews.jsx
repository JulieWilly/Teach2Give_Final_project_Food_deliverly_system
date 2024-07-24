import React from 'react';
import Banner from '../../../compnents/Banner';
import axios from 'axios';
import { VITE_API_URL_BASE } from '../../../../configs/configs';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import Footer from '../../../compnents/Footer';
import Title from '../../../compnents/Title';


const Add_Reviews = () => {
  const createAddresses = async () => {
      try{
          const createAddresses = await axios
            .post(
              `${VITE_API_URL_BASE}/address/create`,
              {
                customerAddress: values.customerAddress,
                city: values.city,
                state: values.state,
                zipcode: values.zipcode,
              },
              {
                withCredentials: true,
              }
            )
            .catch((error) => console.log(error));

            console.log("payment v", values);
            console.log('addresses',createAddresses)
      } catch(error) {
        console.log(error)
      }
  }
  const createPayement = async (values) => {
try {
  const createPayment = await axios
    .post(
      `${VITE_API_URL_BASE}/payments/pay`,
      {
        paymentMethod: values.paymentMethod,
        amount: values.amount,
        paymentStatus: values.paymentStatus,
      },
      {
        withCredentials: true,
      }
    )
    .catch((error) => console.log(error));

  console.log('payment v',values);
  console.log('payment',createPayment);
} catch (error) {
  console.log(error);
}
  }


  const handleSubmit = (values) => {
    createAddresses(values)
    createPayement(values)
  };
  const formValidation = Yup.object({
    customerAddress: Yup.string().required("County name required."),
    amount: Yup.string()
      .required("Amount paid required."),
    city: Yup.string().required("City name required."),
    state: Yup.string().required("State name required."),
    zipcode: Yup.string().required("Zip codes required."),
    paymentMethod: Yup.string().required("Payment method required."),
    paymentStatus: Yup.string().required("Payment status required."),
  });
  const formik = useFormik({
    initialValues: {
      reviewRating: "",
      reviewComment: "",
      customerName: "",
     
    },
    onSubmit: handleSubmit,
    validationSchema: formValidation,
  });
  return (
    <div>
      <Banner
        title={"Review our services"}
        desc={
          "Rate our services and products in general and provide your insights"
        }
      />
      <Title title={"Enter billing detaails below."} />
      <div className="billing_details">
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="inputs">
            <label htmlFor="customerName">Customer name:</label>
            <input
              type="text"
              placeholder="Customer Name"
              name="customerName"
              value={formik.values.customerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.customerName && formik.errors.customerName && (
              <p>{formik.errors.customerName}</p>
            )}
          </div>

          <div className="inputs">
            <label htmlFor="Rating">Rating:</label>

            <input
              type="number"
              placeholder="Ratings"
              name="reviewRating"
              value={formik.values.reviewRating}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.reviewRating && formik.errors.reviewRating && (
              <p>{formik.errors.reviewRating}</p>
            )}
          </div>

          <div className="inputs">
            <label htmlFor="comment">Comments:</label>

            <input
              type="text"
              placeholder="Comments"
              name="reviewComment"
              value={formik.values.reviewComment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.reviewComment && formik.errors.reviewComment && (
              <p>{formik.errors.reviewComment}</p>
            )}
          </div>

          <div className="buttons">
            <button >Submit review</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}




export default Add_Reviews;