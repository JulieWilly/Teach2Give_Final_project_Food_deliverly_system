import "./home.css";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { GrFormCheckmark } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Products = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [product, setProducts] = useState([]);
  const navigate = useNavigate();

  // ADD PRODUCTS TO THE CART.
  const handleAddToCart = async (product_id) => {
    try {
      const addToCart = await axios
        .put(
          `${VITE_API_URL_BASE}/products/${product_id}`,
          {
            addedToCart: true,
          },
          {
            withCredentials: true,
          },
        )
        .catch((error) => console.log(error));
      console.log("product id", product_id);
      console.log(addToCart);
      toast("Product added to cart.");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await axios
          .get(`${VITE_API_URL_BASE}/products/products`)
          .catch((error) => console.log(error));
        setProducts(products.data.data);
        console.log(products.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  return (
    <div>
      <Title title={"Popular Foods"} description={""} />
      <div className="products_sect">
        {product && product.length > 0 ? (
          product.map((products, key) => (
            <div className="product" key={key}>
              <div className="img">
                <img src={products.productImg} alt="" />
              </div>
              <div className="product_desc">
                <h2>{products.productName}</h2>
                <p>{products.productDesc}</p>
                <p>$ ({products.productPrice})</p>
              </div>
              <div className="buttons btn_to_cart">
                {products && products.addedToCart == true ? (
                  <button
                    className="btn_2"
                    onClick={() => {
                      handleAddToCart(products.product_id);
                    }}
                  >
                    {<GrFormCheckmark />}
                    Added to cart
                  </button>
                ) : (
                  <button
                    className="btn2 btn_2"
                    onClick={() => {
                      handleAddToCart(products.product_id);
                    }}
                  >
                    {<FaCartPlus />}
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Loading data ...</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Products;
