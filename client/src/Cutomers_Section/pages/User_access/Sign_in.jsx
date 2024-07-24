import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import "./user_access.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import { MdOpenWith } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../compnents/Title";

const Sign_in = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const notify = () => {};
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError(false);

      const login = await axios
        .post(
          `${VITE_API_URL_BASE}/login`,
          {
            custEmail: values.custEmail,
            password: values.password,
          },
          {
            withCredentials: true,
          }
        )
        .catch((error) => toast.warning('Invalid user credentials!!'));

      console.log(login.data.data.customerRole);
      console.log(login);
      if (login.data.success === true) {
        if (login.data.data.customerRole === "Admin") {
          toast("Customer logged in sucessfully.");

          navigate("/admin_home");
        } else {
          toast("Admin logged in successfully");

          navigate("/users_home");
        }
      }
    } catch (error) {
      console.log(error);
      setError(error);
      toast.error(`Something went wrong!!`);

    } finally {
      setLoading(false);
    }
  };
  const formValidation = Yup.object({
    custEmail: Yup.string()
      .email("Incorrect email format.")
      .required("Customer email address required."),
    password: Yup.string().required("Password required."),
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
    <>
    <Title title={'Welcome back!'} description={'Proceed to log in in you account'}/>
      <div className="signup_sect">
        <form className="_form" onSubmit={formik.handleSubmit}>
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

          <button onClick={notify}>
            {loading ? "Signing in. Please wait ..." : "Sign in"}
          </button>
          <ToastContainer />
          <p>
            Create accout with us. <Link to={"/sign_up"}> Sign up</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Sign_in;
