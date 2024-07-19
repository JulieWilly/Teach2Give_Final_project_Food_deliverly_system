import "./products.css";
import React from "react";
import icon from "../../../assets/react.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";

const Products = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  // post products to the database.
  const handleSubmit = async (values) => {
    try{
        const postProducts = await axios.post(`${VITE_API_URL_BASE}/products/create`, {
            productName: values.productName,
            productDesc: values.productDesc,
            productPrice: values.productPrice
        }).catch(error => console.log(error))
        console.log(postProducts)

        if (postProducts.data.success === true) {
            alert('dklkldfkldfkl')
        }

    } catch(error) {
        console.log(error)
    }

  };
  const formValidation = Yup.object({
    productName: Yup.string()
      .required("Product name required."),
    productDesc: Yup.string()
      .required("Product description required."),
    productPrice: Yup.number().required("Product price required.")
  });
  const formik = useFormik({
    initialValues: {
      productName: "",
      productDesc: "",
      productPrice: "",
    },
    onSubmit: handleSubmit,
    validationSchema: formValidation,
  });
  return (
    <div className="products_sect">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Product name"
            name="productName"
            value={formik.values.productName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.productName && formik.errors.productName && (
            <p>{formik.errors.productName}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Product Description"
            name="productDesc"
            value={formik.values.productDesc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.productDesc && formik.errors.productDesc && (
            <p>{formik.errors.productDesc}</p>
          )}
        </div>
        <div>
          <input
            type="number"
            placeholder="Price"
            name="productPrice"
            value={formik.values.productPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.productPrice && formik.errors.productPrice && (
            <p>{formik.errors.productPrice}</p>
          )}
        </div>
    
        <button type="submit">
          {loading ? "Adding product. Please wait ..." : "Add product"}
        </button>

      </form>
    </div>
  );
};

export default Products;
