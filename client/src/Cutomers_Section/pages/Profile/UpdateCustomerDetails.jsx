import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import default_profile from "../../../assets/default_profile.png";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import { useNavigate } from "react-router-dom";
import useStore from "../../../Store/userStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";

const UpdateCustomerDetails = () => {
  const [customer, setCustomer] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef();
  const [image, setImage] = useState();
  const user = useStore((state) => state.user);
  const userID = user.data.cust_id;


  const handleImageChange = () => {
    inputRef.current.click();
  };
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
    const file = event.target.files[0];
    setImage(file);
    previewFiles(file);
  };

  // GET CUSTOMER DETAILS.
  useEffect(() => {
    const getCustomerDetails = async () => {
      try {
        const getDetails = await axios
          .get(`${VITE_API_URL_BASE}/${userID}`, { withCredentials: true })
          .catch((error) => {
            console.log(error);
          });
        setCustomer(getDetails.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCustomerDetails();
  }, []);
  useEffect(() => {
    const updateDetails = () => {
      if (customer) {
        formik.setValues({
          custName: customer.custName,
          custEmail: customer.custEmail,
          custPhoneNumber: customer.custPhoneNumber,
          custAvatar: customer.custAvatar,
        });
      }
    };
    updateDetails();
  }, [customer]);

  // post products to the database.
  const handleSubmit = async (values) => {
    // e.preventDefault();
    try {
      const updateCustomer = await axios
        .patch(
          `${VITE_API_URL_BASE}/update/${userID}`,
          {
            custName: values.custName,
            custEmail: values.custEmail,
            custPhoneNumber: values.custPhoneNumber,
            custAvatar: values.custAvatar
          },
          {
            withCredentials: true,
          }
        )
        .catch((error) => console.log(error));

        console.log(updateCustomer)
    } catch (error) {
      console.log(error);
    }
  };

  // find products and meals
  const formValidation = Yup.object({
    custName: Yup.string().required("Customer name required."),
    custEmail: Yup.string()
      .required("Email address required.")
      .email("Incorrect email address format"),
    custPhoneNumber: Yup.number()
      .integer("Phone number should not contain characters")
      .required("Phone number required."),
  });
  const formik = useFormik({
    initialValues: {
      custName: "",
      custEmail: "",
      custPhoneNumber: "",
      custAvatar: null,
    },
    onSubmit: handleSubmit,
    validationSchema: formValidation,
  });
  return (
    <div className="input">
      <div className="products_left">
        <form className="_form" onSubmit={formik.handleSubmit}>
          <div className="custImage" onClick={handleImageChange}>
            {image ? (
              <img src={image} alt="customer image" />
            ) : (
              <img src={default_profile} alt="customer image" />
            )}
            <input
              type="file"
              name="custAvatar"
              value={formik.values.custAvatar}
              onChange={handleImage}
              onBlur={formik.handleBlur}
              className="cust_img"
              placeholder="Add new Image"
              ref={inputRef}
              style={{ display: "none" }}
            />
            {formik.touched.custAvatar && formik.errors.custAvatar && (
              <p className="error">{formik.errors.custAvatar}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Name"
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
              type="number"
              placeholder="Phone number"
              name="custPhoneNumber"
              value={formik.values.custPhoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.custPhoneNumber &&
              formik.errors.custPhoneNumber && (
                <p>{formik.errors.custPhoneNumber}</p>
              )}
          </div>
          <button type="submit">
            {loading ? "Updating details. Please wait ..." : "Update details"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomerDetails;
