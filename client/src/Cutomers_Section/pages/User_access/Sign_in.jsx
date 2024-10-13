import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./user_access.css";
import { useFormik } from "formik";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import "../../components/global.css";
import * as Yup from "yup";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../components/Title";
import loginImg from "../../../assets/login_image.jpg";
import createStore from "../../../Store/userStore";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../../configs/firebase";
const Sign_in = () => {
  const setUser = createStore((state) => state.setUser);

  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const signInWithSocialAccounts = async (
    custName,
    custEmail,
    custPhoneNumber,
    custAvatar
  ) => {
    try {
      setError(false);
      setLoading(true);
      console.log(custName);
      console.log(custEmail);
      console.log(custPhoneNumber);
      console.log("image", custAvatar);
      const createCustomer = await axios
        .post(`${VITE_API_URL_BASE}/create`, {
          custName: custName,
          custEmail: custEmail,
          custPhoneNumber: custPhoneNumber,
          custAvatar: custAvatar,
        })
        .catch((error) => {
          console.log("catcherror", error);
          toast.warning("Something went wrong!!!");
        });
      console.log(createCustomer.data);
      if (createCustomer.data.success === true) {
        toast("Login in successfull.");
        navigate("/users_home");
      }
    } catch (error) {
      console.log(error);
      setError(error);
      toast("Server error");
    } finally {
      setLoading(false);
    }
  };
  // continue with google.
  const withGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log("google account user ", user);
        if (user) {
          toast.success("Logged in successfully.");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // continue with facebook.
  const withFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        const userName = user.displayName;
        const userEmail = user.email;
        const phoneNumber = user.phoneNumber;
        const custAvatar = user.photoURL;

        if (user) {
          toast.success("User signed in successfully.");
          signInWithSocialAccounts(
            userName,
            userEmail,
            phoneNumber,
            custAvatar
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
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
        .catch((error) => toast.warning("Invalid user credentials!!"));
      const loginData = login.data;
      if (login.status == 200 && loginData.success === true) {
        toast(" Logged in successfully, as an Amin");
        const items = login.data;
        console.log("set user 2", setUser(items));
        if (loginData.data.customerRole === "Admin") {
          navigate("/admin_home");
        } else {
          navigate("/users_home");
        }
      }
    } catch (error) {
      setError(error);
      toast.error(`Something went wrong!!`);
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
                <p className="error">{formik.errors.custEmail}</p>
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
              <button>
                {loading ? "Signing in. Please wait ..." : "Sign in"}
              </button>
            </div>
            <p>
              Create accout with us. <Link to={"/sign_up"}> Sign up</Link>
            </p>

            <div className="or">
              <h1>- Or continue with -</h1>
            </div>
            <div className="social_accounts">
              <div className="row">
                <div className="account color" onClick={withGoogle}>
                  {<FaGoogle />}Google
                </div>
                <div className="account color" onClick={withFacebook}>
                  {<FaFacebookF />} Facebook
                </div>
              </div>
            </div>
          </div>

          <ToastContainer />
          {error && <p className="color"> {error.message}</p>}
        </form>
        <div className="login_img">
          <img src={loginImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default Sign_in;
