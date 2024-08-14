import React, { useState } from "react";
import "./user_access.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../compnents/Title";
import loginImg from "../../../assets/sign_up.jpg";
const Sign_up = () => {
  const [inputs, setInputs] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // form validations.

  // const sign in with firebase.
  const handleSubmit = async (values) => {
    try {
      setError(false);
      setLoading(true);
      const createCustomer = await axios
        .post(`${VITE_API_URL_BASE}/create`, {
          custName: values.custName,
          custEmail: values.custEmail,
          custPhoneNumber: values.custPhoneNumber,
          password: values.password,
        })
        .catch((error) => toast.warning("Something went wrong!!!"));
      setInputs(createCustomer);

      console.log(createCustomer);
      if (createCustomer.data.success === true) {
        toast("Account created successfully.");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error);
      toast("Server error");
    } finally {
      setLoading(false);
    }
  };
  const formValidations = Yup.object({
    custName: Yup.string()
      .required("Customer name is required.")
      .min(5, "Customer name should have atleast 5 characters")
      .max(15, "Customer name should not have max of 15 characters"),
    custEmail: Yup.string()
      .required("Customer email address is required.")
      .email("Invalid email format."),
    custPhoneNumber: Yup.number()
      .required("Customer phone number is required.")
      .integer("Phone number should only be composed of numbers.")
      .min(5, "Phone should be atleast 8 numbers"),
    password: Yup.number()
      .required("Password is required.")
      .integer("Phone number must be a number."),
  });

  const formik = useFormik({
    initialValues: {
      custName: "",
      custEmail: "",
      custPhoneNumber: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: formValidations,
  });

  return (
    <>
      <Title
        title={"Create your new account"}
        description={"Proceed to create a new account. "}
      />
      <div className="signup_sect">
        <div className="login_img">
          <img src={loginImg} alt="Sign up image." />
        </div>
        <form className="_form" onSubmit={formik.handleSubmit}>
          <div className="form_inputs">
            <div>
              <input
                type="text"
                placeholder="Customer name"
                name="custName"
                value={formik.values.custName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.custName && formik.errors.custName && (
                <p className="error">{formik.errors.custName}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email address"
                name="custEmail"
                value={formik.values.custEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.custEmail && formik.errors.custEmail && (
                <p className="error">{formik.errors.custEmail}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                placeholder="Phone number"
                name="custPhoneNumber"
                value={formik.values.custPhoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.custPhoneNumber &&
                formik.errors.custPhoneNumber && (
                  <p className="error">{formik.errors.custPhoneNumber}</p>
                )}
            </div>

            <div>
              <input
                type="number"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="error">{formik.errors.password}</p>
              )}
            </div>

            <div className="buttons">
              <button type="submit">
                {loading ? "Signing up. Please wait ..." : "Sign up"}
              </button>
            </div>
            <p>
              Already have an account? <Link to={"/"}> Sign in</Link>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Sign_up;
