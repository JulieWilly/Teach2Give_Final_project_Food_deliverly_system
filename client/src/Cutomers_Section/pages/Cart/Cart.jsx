import Banner from "../../compnents/Banner";
import Title from "../../compnents/Title";
import "./cart.css";
import React, { useEffect, useState } from "react";
import icon from "../../../assets/foods.jpg";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../compnents/Footer";
import { VITE_API_URL_BASE } from "../../../configs/configs";
const Cart = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setloading] = useState();
  const [cart, setCart] = useState();
  const [addQuantity, setAddQuantity] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);

  const handleCheckOut = async () => {
    try {
      console.log(cart);
      cart.map(async (quatity) => {
        const price = quatity.productPrice;
        console.log("current price", price);
        await axios
          .post(
            `${VITE_API_URL_BASE}/orders/create`,
            {
              totalAmount: quatity.productPrice,
            },
            {
              withCredentials: true,
            },
          )
          .catch((error) => console.log(error));

        navigate("/billing");
      });
    } catch (error) {
      console.log(error);
    }
  };
  // ADD ITEMS
  const addItem = (id) => {
    // const addItems = cart.map( add => {
    //   if (add.product_id === id){
    //     return {...add, addQuantity:add.addQuantity + 1}
    //   }
    //   return add
    // })
    // setCart(addItems)
    // setTotalAmt(addItems)

    const add = addQuantity + 1;
    setAddQuantity(add);
  };

  // REMOVE ITEMS
  const reduceItems = () => {
    const reduce = addQuantity - 1;
    setAddQuantity(reduce);
  };
  // REMOVE AN ITEM FROM THE CART.
  const handleRemoveFromCart = async (product_id) => {
    try {
      const removeFromCart = await axios
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
      console.log(removeFromCart);
      const removedItem = removeFromCart;
      const approvedItems = removedItem.filter(
        (item) => item.addedToCart === true,
      );
      setCart(approvedItems);
      alert("Item removed successfully.");
    } catch (error) {
      console.log(error);
    }
  };
  //fetch products added to the cart
  const toCart = async () => {
    try {
      const cartItems = await axios
        .get(`${VITE_API_URL_BASE}/products/products`)
        .catch((error) => console.log(error));
      const approvedToCart = cartItems.data.data;
      const approvedItems = approvedToCart.filter(
        (item) => item.addedToCart === true,
      );
      setCart(approvedItems);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    toCart();
  }, []);
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
            {cart && cart.length > 0 ? (
              cart.map((cartItem, key) => (
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
                        </button>{" "}
                        ({addQuantity}){" "}
                        <button onClick={() => addItem(cartItem.product_id)}>
                          +
                        </button>
                      </p>
                    </td>
                    <td>
                      <div className="del">
                        ${12}
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
                <tr>
                  <th>
                    <h3>Sub -total</h3>
                  </th>
                  <td>
                    <p>$ {addQuantity}</p>
                  </td>
                </tr>
                <tr>
                  <th>
                    <h3>Total</h3>
                  </th>
                  <td>
                    <p>$ {300}</p>
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
