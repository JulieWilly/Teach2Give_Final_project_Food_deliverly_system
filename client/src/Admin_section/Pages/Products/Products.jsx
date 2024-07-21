import "./products.css";
import React, { useEffect } from "react";
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
  const [image, setImage] = useState();
  const [products, setProducts] = useState([]);

  // find products
  useEffect(() => {
    const findProducts = async () => {
      try {
        const products = await axios
          .get(`${VITE_API_URL_BASE}/products/products`, {
            withCredentials: true,
          })
          .catch((error) => console.log(error));
        setProducts(products.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    findProducts();
  }, []);

  // DELETE AN PRODUCT FROM THE APPLICATION.
  const handleDelete = async () => {
    const deleteItems = await axios.delete(`${VITE_API_URL_BASE}/products`, {
      withCredentials: true,
    });
    alert("delete successfully.");
  };

  // EDIT OR UPDATE AN ITEM.
  const handleEdit = () => {
    alert("update a product.");
  };
  const previewFiles = (file) => {
    const reader = new FileReader(); // read the file or image
    // convert the file into a url to pass it to the cloudinary
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // provide and set the image after it has completely loaded onto the application.
      setImage(reader.result);
    };
    console.log(image);
  };

  const handleImageChange = (event) => {
    const imageUploaded = event.target.files[0];
    console.log(image);

    setImage(imageUploaded);

    previewFiles(imageUploaded);
  };

  // post products to the database.
  const handleSubmit = async (values) => {
    // values.preventDefault();
    try {
      const postProducts = await axios
        .post(
          `${VITE_API_URL_BASE}/products/create`,
          {
            productName: values.productName,
            productDesc: values.productDesc,
            productPrice: values.productPrice,
            productCartegory: values.productCategory,
            productImg: image,
          },
          {
            withCredentials: true,
          },
        )
        .catch((error) => console.log(error));
      console.log("products", postProducts);

      if (postProducts.data.success === true) {
        alert("Products posted successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // find products and meals
  const formValidation = Yup.object({
    productName: Yup.string().required("Product name required."),
    productDesc: Yup.string().required("Product description required."),
    productPrice: Yup.number().required("Product price required."),
    productCategory: Yup.string().required("Product category required."),
  });
  const formik = useFormik({
    initialValues: {
      productName: "",
      productDesc: "",
      productPrice: "",
      productImg: "",
      productCategory: "",
    },
    onSubmit: handleSubmit,
    validationSchema: formValidation,
  });
  return (
    <div className="products_sect">
      <div className="top">
        <div className="products_left">
          <form onSubmit={formik.handleSubmit}>
            <h2 className="title">Enter products details here.</h2>
            <div>
              <input
                type="file"
                placeholder="Add image here."
                name="productImage"
                value={formik.values.productImg}
                onChange={(e) => handleImageChange(e)}
                accept="image/png, image/jpeg, image/jpg, image/jfif"
                onBlur={formik.handleBlur}
              />
              {formik.touched.productImg && formik.errors.productImg && (
                <p>{formik.errors.productImg}</p>
              )}
            </div>
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
                type="text"
                placeholder="Product Category"
                name="productCategory"
                value={formik.values.productCategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.productCategory &&
                formik.errors.productCategory && (
                  <p>{formik.errors.productCategory}</p>
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

        <div className="products_right">
          <img src={image} alt="" />
        </div>
      </div>

      <h1>Products available.</h1>

      <div className="bottom">
        {products && products.length > 0 ? (
          products.map((product, key) => (
            <div className="order">
              <div className="order_img">
                <img src={product.productImg} alt="" />
              </div>
              <div className="order_desc">
                <div className="product_desc">
                  <h2>{product.productName}</h2>
                  <p className="p">{product.productDesc}</p>
                  <p className="p">{product.productCartegory}</p>
                  <p className="price">{product.productPrice} $</p>
                </div>
                <div className="buttons">
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={handleDelete}>Remove</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading more products........</p>
        )}
      </div>
    </div>
  );
};

export default Products;
