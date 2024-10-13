import "./billing.css";
import React, { useState } from "react";
import Banner from "../../components/Banner";
import Title from "../../components/Title";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Footer from "../../components/Footer";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Billing = (values) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [error, setError] = useState(false)
  const handleSubmit = async (values) => {
    try{
      setLoading(true)
      const createLocation = await axios.post(
        `${VITE_API_URL_BASE}/address/create`, {
          customerAddress: values.customerAddress,
          city: values.city,
          state: values.state,
          zipcode: values.zipcode
        }, {
          withCredentials: true
        }
      ).catch( error => console.log(error))

      if (createLocation.data.success === true){
        toast('Details saved successfully.')
        navigate("/order_review");
      }


    }catch(error) {
      console.log(error)
      setError(error)
    } finally{
      setLoading(false)
    }
  };

  const formValidation = Yup.object({
    customerAddress: Yup.string().required("County name required."),
    city: Yup.string().required("City name required."),
    state: Yup.string().required("State name required."),
    zipcode: Yup.number().required("Zip codes required."),
  });

  const formik = useFormik({
    initialValues: {
      customerAddress: "",
      city: "",
      state: "",
      zipcode: "",
    },
    onSubmit: handleSubmit,
    validationSchema: formValidation,
  });
  return (
    <div>
      <Banner
        title={"Check out yout products."}
        desc={"Provide your pick-up station details."}
      />
      <Title title={"Provide correct location details."} />

      <div className="billing_details">
        <div className="location_details">
          <form className="_form form" onSubmit={formik.handleSubmit}>
            <h2 className="form_title">Enter required details</h2>
            <div className="inputs">
              <label htmlFor="county">County:</label>
              <input
                type="text"
                placeholder="County"
                value={formik.customerAddress}
                name="customerAddress"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.customerAddress &&
                formik.errors.customerAddress && (
                  <p className="error">{formik.errors.customerAddress}</p>
                )}
            </div>
            <div className="inputs">
              <label htmlFor="city">City</label>
              <input
                type="text"
                placeholder="City"
                value={formik.values.city}
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="error">{formik.errors.city}</p>
              )}
            </div>
            <div className="inputs">
              <label htmlFor="state">State</label>
              <input
                type="text"
                placeholder="State"
                value={formik.values.state}
                name="state"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.state && formik.errors.state && (
                <p className="error">{formik.errors.state}</p>
              )}
            </div>
            <div className="inputs">
              <label htmlFor="zipcode">Zipcode</label>
              <input
                type="number"
                placeholder="Zip-codes"
                value={formik.values.zipcode}
                name="zipcode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.zipcode &&
                formik.errors.zipcode && (
                  <p className="error">{formik.errors.zipcode}</p>
                )}
            </div>

            <div className="buttons">
              <button>
                {loading ? "Signing in. Please wait ..." : "Sign in"}
              </button>
            </div>
            <ToastContainer/>
          </form>

        </div>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.004702632412!2d37.145500550158275!3d-0.7224248322217987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1828a28207db7113%3A0xbc8b3625ac089be8!2sMurang&#39;a!5e0!3m2!1sen!2ske!4v1723118146740!5m2!1sen!2ske"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Billing;
