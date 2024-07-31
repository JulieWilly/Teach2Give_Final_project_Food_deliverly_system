import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import default_profile from "../../../assets/default_profile.png"
import { VITE_API_URL_BASE } from "../../../configs/configs";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css";
const UpdateCustomerDetails = () => {
  const [inputs, setInputs] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const inputRef  = useRef()
  const [image, setImage] = useState()

  // get data from the database and prepopulate the field.

  useEffect(() => {
    const getDetails = async () => {
      const getData = await axios.get(`${VITE_API_URL_BASE}`);
    };
  });

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
        .catch((error) => console.log(error));
      setInputs(createCustomer);

      console.log(createCustomer);
      if (createCustomer.data.success === true) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error);
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
      custImage: "",
    },
    onSubmit: handleSubmit,
    validationSchema: formValidations,
  });

  const handleImageChange = () => {
    inputRef.current.click()
  }
   const previewFiles = (file) => {
     const reader = new FileReader(); // read the file or image
     // convert the file into a url to pass it to the cloudinary
     reader.readAsDataURL(file);
     reader.onloadend = () => {
       // provide and set the image after it has completely loaded onto the application.
       setImage(reader.result);
     };
   };

  const handleImage = (event) => {
    const file = event.target.files[0]
    console.log(file)
    setImage(file)
    previewFiles(file)
  }


  return (
    <div className="form_input">
      <form className="_form" onSubmit={formik.handleSubmit}>
        <div className="custImage" onClick={handleImageChange}>
          {image ? (
            <img src={image} alt="customer image" />
          ) : (
            <img src={default_profile} alt="customer image" />
          )}
          <input
            type="file"
            name="custImage"
            value={formik.values.custImage}
            onChange={handleImage}
            onBlur={formik.handleBlur}
            className="cust_img"
            placeholder="Add new Image"
            ref={inputRef}
            style={{ display: "none" }}
          />
          {formik.touched.custImage && formik.errors.custImage && (
            <p className="error">{formik.errors.custImage}</p>
          )}
        </div>
        <div className="inputs">
          <input
            type="text"
            placeholder="First name"
            name="custName"
            value={formik.values.custName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.custName && formik.errors.custName && (
            <p className="error">{formik.errors.custName}</p>
          )}
        </div>
        <div className="inputs">
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
        <div className="inputs">
          <input
            type="number"
            placeholder="Phone numnbr"
            name="custPhoneNumber"
            value={formik.values.custPhoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.custPhoneNumber && formik.errors.custPhoneNumber && (
            <p className="error">{formik.errors.custPhoneNumber}</p>
          )}
        </div>

        <div className="inputs">
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

        <button type="submit">
          {loading ? "Updating details. Please wait ..." : "Update details."}
        </button>
      </form>
    </div>
  );
};

export default UpdateCustomerDetails;
