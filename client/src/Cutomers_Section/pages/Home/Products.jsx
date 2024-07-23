import "./home.css";
import React, { useEffect, useState } from "react";
import food from "../../../assets/foods.jpg";
import Title from "../../compnents/Title";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [product, setProducts] = useState([]);
  const navigate = useNavigate();


  // ADD PRODUCTS TO THE CART.
  const handleAddToCart = async (product_id) => {
    try{
      const addToCart = await axios
        .put(
          `${VITE_API_URL_BASE}/products/${product_id}`,
          {
            addedToCart: true,
          },
          {
            withCredentials: true,
          }
        )
        .catch((error) => console.log(error));
        console.log('product id', product_id)
        console.log(addToCart)
      alert('added to cart successfully.')
    } catch(error) {
      console.log(error)
    }
  }
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
              <div className="buttons">
                {products && products.addedToCart == true ? (
                  <button
                    className="btn_2"
                    onClick={() => {
                      handleAddToCart(products.product_id);
                    }}
                  >
                    Added to cart
                  </button>
                ) : (
                  <button
                    className="btn2"
                    onClick={() => {
                      handleAddToCart(products.product_id);
                    }}
                  >
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
    </div>
  );
};

export default Products;
