import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./user_access.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";

const Sign_in = () => {
  const [input, setInputs] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      setError(false)

      const login = await axios.post(`${VITE_API_URL_BASE}/login`, {
        custEmail: values.custEmail,
        password: values.password
      }).catch(error => console.log(error))

      if(login.data.message=== 'success'){
        alert('Logged in successfully.')
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const formValidation = Yup.object({
    custEmail: Yup.string()
      .email("Incorrect email format.")
      .required("Customer email address required."),
    password: Yup.number()
      .required("Password required.")
      .integer("Password should be a number."),
  });
  const formik = useFormik({
    initialValues: {
      custEmail: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: formValidation,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          type="text"
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
          type="text"
          placeholder="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p>{formik.errors.password}</p>
        )}
      </div>
      <button type="submit">Log in</button>
      <p>
        Create accout with us. <Link to={"/sign_up"}> Sign up</Link>
      </p>
    </form>
  );
};

export default Sign_in;
