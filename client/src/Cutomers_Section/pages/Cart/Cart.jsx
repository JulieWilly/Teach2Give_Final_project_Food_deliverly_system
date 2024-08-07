import Banner from "../../compnents/Banner";
import Title from "../../compnents/Title";
import "./cart.css";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../compnents/Footer";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import createStore from "../../../Store/userStore";
const Cart = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setloading] = useState();
  // const [cart, setCart] = useState([]);
  const [addQuantity, setAddQuantity] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const {
    cartItems,
    setCart,
    addToCart,
    totalAmount,
    totalQuantity,
    noOfItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = createStore();



  // const totalAmount = () => {
  //   const totalAmount = cartItems.reduce((acc, value) => {
  //     return  acc + (value.subTotal)
  //   }, 0)
  //     setTotalAmt(totalAmount)
  // }

  // const reduceTotalAmount = () => {
  //   const totalAmount = cartItems.reduce((acc, value) => {
  //     console.log('acc', acc)
  //     console.log("value - ", value.reduced);
  //     return acc -= value.subTotal
  //   }, 0);
  //   setTotalAmt(totalAmount);
  // };

  const addItems = (id) => {
    // totalAmount();
    incrementQuantity(id);
  };

  const reduceItems = (id) => {
    // reduceTotalAmount();
    decrementQuantity(id);
  };

  const handleCheckOut = async () => {

    try {
      setloading(true);
      setError(false);

      console.log('total quantity', totalQuantity)
      console.log('noOfItems', noOfItems)
      console.log('cart items', cartItems)
      cartItems.map(async (quatity) => {
        const items = await axios
          .post(
            `${VITE_API_URL_BASE}/orders/create`,
            {
              totalAmount: totalAmount,
            },
            {
              withCredentials: true,
            },
          )
          .catch((error) => console.log(error));

          console.log('items posted in the database.', items)
        navigate("/billing");

      });
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setloading(false);
    }
  };

  // REMOVE AN ITEM FROM THE CART.
  const handleRemoveFromCart = async (product_id) => {
    try {
      const removeCart = await axios
        .put(
          `${VITE_API_URL_BASE}/products/${product_id}`,
          {
            addedToCart: false,
          },
          {
            withCredentials: true,
          },
        )
        .catch((error) => console.log(error));
      const removedItem = removeCart.data.data;
      removeFromCart(removedItem.product_id);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch products added to the cart
  const toCart = async () => {
    try {
      setloading(true);
      setError(false);
      const cartItems = await axios
        .get(`${VITE_API_URL_BASE}/products/products`)
        .catch((error) => console.log(error));
      const approvedToCart = cartItems.data.data;
      const approvedItems = approvedToCart.filter(
        (item) => item.addedToCart === true,
      );
      const defaultQuantity = approvedItems.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
        subTotal: item.quantity
          ? item.quantity * item.productPrice
          : item.productPrice,
      }));
      setCart(defaultQuantity);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    toCart();
  }, [setCart]);
  return (
    <div>
      <Banner
        title={"Cart section."}
        desc={"This page contains the cart items."}
      />
      <Title title={"Your orders"} />
      <div className="order_sect">
        <div className="orders_desc">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>SubTotal</th>
              </tr>
            </thead>
            {error && <div>{error}</div>}

            {cartItems && cartItems.length > 0 ? (
              cartItems.map((cartItem, key) => (
                <tbody key={key}>
                  <tr className="_row">
                    <td>
                      <div className="_product">
                        <div className="product_img">
                          <img src={cartItem.productImg} alt="Product image" />
                        </div>
                        <h4>{cartItem.productName}</h4>
                      </div>
                    </td>
                    <td>$ {cartItem.productPrice}</td>
                    <td>
                      <p>
                        <button
                          onClick={() => reduceItems(cartItem.product_id)}
                        >
                          -
                        </button>
                        ({cartItem.quantity})
                        <button onClick={() => addItems(cartItem.product_id)}>
                          +
                        </button>
                      </p>
                    </td>
                    <td>
                      <div className="del">
                        ${cartItem.subTotal}
                        <MdDeleteForever
                          onClick={() =>
                            handleRemoveFromCart(cartItem.product_id)
                          }
                          className="icon"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <p>You have no items in your cart......</p>
            )}
          </table>
        </div>
        <div className="orderstotal">
          <h2>Cart Totals</h2>
          <div className="sub_totals">
            <table>
              <thead>
                {/* <tr>
                  <th>
                    <h3>Sub -total</h3>
                  </th>
                  <td>
                    <p>$ {}</p>
                  </td>
                </tr> */}
                <tr>
                  <th>
                    <h3>Total</h3>
                  </th>
                  <td>
                    <p>${totalAmount}</p>
                  </td>
                </tr>
              </thead>
            </table>
            <div className="buttons">
              <button onClick={handleCheckOut}>Check Out</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
