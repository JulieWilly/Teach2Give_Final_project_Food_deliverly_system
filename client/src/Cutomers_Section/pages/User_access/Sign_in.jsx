import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import "./user_access.css";
import { useFormik } from "formik";
import '../../compnents/global.css'
import * as Yup from "yup";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../compnents/Title";
import loginImg from '../../../assets/login_image.jpg'
const Sign_in = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const notify = () => {
    toast('Logged in successfully')
  };
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
        const loginData = login.data.success;
        console.log('Login data', loginData)
      if (loginData === true) {

        if (!loginData.customerRole === "Admin") {
          navigate("/users_home");

        } else {
          navigate("/admin_home");



        }
      }


    } catch (error) {
      setError(error);
      toast.error(`Something went wrong!!`);
      setError*('')

    } finally {
      setLoading(false);
    }
  };
  const formValidation = Yup.object({
    custEmail: Yup.string()
      .email("Incorrect email format.")
      .required("Email address required."),
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
      <Title
        title={"Welcome back!"}
        description={"Proceed to log in in you account"}
      />
      <div className="signup_sect">
        <form className="_form" onSubmit={formik.handleSubmit}>
          <div className="form_inputs">
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
                <p className="error" >{formik.errors.custEmail}</p>
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
                <p className="error">{formik.errors.password}</p>
              )}
            </div>

            <div className="buttons">
              <button onClick={notify}>
                {loading ? "Signing in. Please wait ..." : "Sign in"}
              </button>
            </div>
            <p>
              Create accout with us. <Link to={"/sign_up"}> Sign up</Link>
            </p>
          </div>
          <ToastContainer />
        </form>
        <div className="login_img">
          <img src={loginImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default Sign_in;
