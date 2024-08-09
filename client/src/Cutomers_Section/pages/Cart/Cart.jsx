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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cart = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setloading] = useState();
  const [isActive, setIsActive] = useState(0);
  const {
    cartItems,
    setCart,
    totalAmount,
    totalQuantity,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = createStore();

  const addItems = (id) => {
    incrementQuantity(id);
  };

  const reduceItems = (id) => {
    decrementQuantity(id);
  };

  // create the order items .
  const createOrderItems = async (items) => {
    setError(false);
    setloading(true);
    try {
      cartItems.map((item) => {
        axios
          .post(
            `${VITE_API_URL_BASE}/orders/items/create`,
            {
              order_item_name: item.productName,
              product_id: item.product_id,
              orderQuantity: item.quantity,
              itemPrice: item.productPrice,
              itemTotal: item.subTotal,
              order_id: items.order_id,
            },
            { withCredentials: true }
          )
          .catch((error) => {
            console.log(error);
            setError(error);
          });
      });
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setloading(false);
    }
  };
  const handleCheckOut = async () => {
    try {
      setloading(true);
      setError(false);

      const items = await axios
        .post(
          `${VITE_API_URL_BASE}/orders/create`,
          {
            totalAmount: totalAmount,
            noOfItems: totalQuantity,
          },
          {
            withCredentials: true,
          }
        )
        .catch((error) => console.log(error));

      // fill the items table handle.
      createOrderItems(items.data.data);

      navigate("/billing");
      if (items.data.success == true) {
        toast("Order has been created successfully!");
      }
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
          }
        )
        .catch((error) => console.log(error));
      const removedItem = removeCart.data.data;
      console.log("removed from cart", removedItem);
      if (removeCart.data.success === true) {
        toast("Item removed from cart.");
      }
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
        (item) => item.addedToCart === true
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
        title={"Your cart.  "}
        desc={"You can add items, remove items from the cart. You can also increase or reduce cart items quantity. ."}
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
              <p>Your cart is empty.</p>
            )}
          </table>
        </div>
        <div className="orderstotal">
          <h2>Cart Totals</h2>
          <div className="sub_totals">
            <table>
              <thead>
                <tr>
                  <th>
                    <h3>Total :</h3>
                  </th>
                  <td>
                    <p>${totalAmount}</p>
                  </td>
                </tr>
              </thead>
            </table>
            <div className="buttons">
              {totalQuantity === 0 && totalAmount === 0 ? (
                <button onClick={handleCheckOut} disabled={!isActive}>
                  {totalAmount == 0
                    ? "Order Now"
                    : `Order ${totalQuantity} for KES ${totalAmount}`}
                </button>
              ) : (
                <button onClick={handleCheckOut} disabled={isActive}>
                  {totalAmount == 0
                    ? "Order Now"
                    : `Order ${totalQuantity} for KES ${totalAmount}`}
                </button>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
