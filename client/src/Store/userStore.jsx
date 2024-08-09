import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const createStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => {
        set(() => ({ user: userData }));
      },

      clearUser: () => {
        set(() => ({ user: null }));
      },

      // manage user item cart.
      cartItems: [],
      totalAmount: 0,
      totalQuantity: 0,
      noOfItems: 0,
      setCart: (items) =>
        set((state) => {
          const updatedItems = items.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
            subTotal: item.quantity
              ? item.quantity * item.productPrice
              : item.productPrice,
          }));

          const totalAmt = updatedItems.reduce(
            (sum, item) => sum + item.subTotal,
            0,
          );
          const totalQuantity = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
          );
          const noOfItems = updatedItems.length;
          return {
            cartItems: updatedItems,
            totalAmount: totalAmt,
            totalQuantity,
            noOfItems,
          };
        }),

      addToCart: (item) =>
        set((state) => {
          // check if the item already exists.
          const itemExists = state.cartItems.find(
            (exist) => exist.product_id === item.product_id,
          );

          // hold the updated values.
          let updatedItems;

          if (itemExists) {
            updatedItems = state.cartItems.map((i) => {
              i.product_id === item.productPrice
                ? {
                    ...i,
                    quantity: i.quantity + 1,
                    subTotal: (i.quantity + 1) * i.productPrice,
                  }
                : i;
            });
          } else {
            return {
              updatedItems: [
                ...state.cartItems,
                { ...item, quantity: 1, subTotal: item.productPrice },
              ],
            };
          }

          const total = updatedItems.reduce(
            (sum, item) => sum + item.subTotal,
            0,
          );
          const noOfItems = updatedItems.length;
          const totalQuantity = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
          );

          return {
            cartItems: updatedItems,
            totalAmount: total,
            totalQuantity,
            noOfItems,
          };
        }),

      incrementQuantity: (itemID) =>
        set((state) => {
          const updatedItems = state.cartItems.map((item) =>
            item.product_id === itemID
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  subTotal: (item.quantity + 1) * item.productPrice,
                }
              : item,
          );

          const total = updatedItems.reduce(
            (sum, item) => sum + item.subTotal,
            0,
          );

          const totalQuantity = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
          );
          return { cartItems: updatedItems, totalAmount: total, totalQuantity };
        }),

      decrementQuantity: (itemID) => {
        set((state) => {
          const updatedItems = state.cartItems.map((item) =>
            item.product_id === itemID && item.quantity > 1
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  subTotal: (item.quantity - 1) * item.productPrice,
                }
              : item,
          );
          const total = updatedItems.reduce(
            (sum, item) => sum + item.subTotal,
            0,
          );
          const totalQuantity = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
          );
          return { cartItems: updatedItems, totalAmount: total, totalQuantity };
        });
      },

      removeFromCart: (itemID) =>
        set((state) => {
          // removeFromCart(removeItem);
          const updatedItems = state.cartItems.filter(
            (item) => item.product_id !== itemID,
          );
          const total = updatedItems.reduce(
            (sum, item) => sum + item.subTotal,
            0,
          );
          const totalQuantity = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
          );
          const noOfItems = updatedItems.length;
          return {
            cartItems: updatedItems,
            totalAmount: total,
            totalQuantity,
            noOfItems,
          };
        }),
    }),

    {
      name: "Foodie-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default createStore;
