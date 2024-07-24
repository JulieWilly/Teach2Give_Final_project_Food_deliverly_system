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
const Sign_up = () => {
  const [inputs, setInputs] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // form validations.

  const handleSubmit = async (values) => {
    try {
      setError(false);
      setLoading(true);
      const createCustomer = await axios
        .post(`${VITE_API_URL_BASE}/create`, {
          custName: values.custName,
          custEmail: values.custEmail,
          custPhoneNumber: values.custPhoneNumber,
          custLocation: values.custLocation,
          customerRole: values.customerRole,
          customerAddress: values.customerAddress,
          password: values.password,
        })
      .catch((error) => toast.warning('Something went wrong!!!'));
      setInputs(createCustomer);

      console.log(createCustomer);
      if (createCustomer.data.success === true) {
        toast('Account created successfully.')
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
    custLocation: Yup.string()
      .required("Customer location is required.")
      .min(5, "Customer location name should have atleast 4 characters")
      .max(15, "Customer location name should not have max of 15 characters"),
    customerAddress: Yup.string().required("Please provide an address below."),
    customerRole: Yup.string().required("Customer role is required."),
    password: Yup.number()
      .required("Password is required.")
      .integer("Phone number must be a number."),
  });

  const formik = useFormik({
    initialValues: {
      custName: "",
      custEmail: "",
      custPhoneNumber: "",
      custLocation: "",
      customerRole: "",
      customerAddress: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: formValidations,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="First name"
          name="custName"
          value={formik.values.custName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.custName && formik.errors.custName && (
          <p>{formik.errors.custName}</p>
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
          <p>{formik.errors.custEmail}</p>
        )}
      </div>
      <div>
        <input
          type="number"
          placeholder="Phone numnbr"
          name="custPhoneNumber"
          value={formik.values.custPhoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.custPhoneNumber && formik.errors.custPhoneNumber && (
          <p>{formik.errors.custPhoneNumber}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Post address name"
          name="customerAddress"
          value={formik.values.customerAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.customerAddress && formik.errors.customerAddress && (
          <p>{formik.errors.customerAddress}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Location"
          name="custLocation"
          value={formik.values.custLocation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.custLocation && formik.errors.custLocation && (
          <p>{formik.errors.custLocation}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="Role"
          name="customerRole"
          value={formik.values.customerRole}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.customerRole && formik.errors.customerRole && (
          <p>{formik.errors.customerRole}</p>
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
      </div>

      <button type="submit">
        {loading ? "Signing up. Please wait ..." : "Sign up"}
      </button>
      <ToastContainer />
      <p>
        Already have an account? <Link to={"/"}> Sign in</Link>
      </p>
    </form>
  );
};

export default Sign_up;
