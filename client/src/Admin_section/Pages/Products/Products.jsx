import "./products.css";
import React, { useEffect } from "react";
import icon from "../../../assets/react.svg";
import { IoAddCircleSharp } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";

const Products = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [image, setImage] = useState();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


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
  
  const handleNavigate = () => {
    navigate('/add_product')
  }
 
  return (
    <div className="products_sect">
      <h1>Products available.</h1>

      <div className="bottom">
        <div className=" add " onClick={handleNavigate}>
          {<IoAddCircleSharp />}
        </div>
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
