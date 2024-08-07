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
      setCart: (items) => set((state) => {
        const updatedItems = items.map((item) => ({
          ...item,
          quantity:item.quantity || 1,
          subTotal: item.quantity ?  item.quantity * item.productPrice : item.productPrice
        }));
        
        const totalAmt = updatedItems.reduce((sum, item) => sum + item.subTotal, 0);
        return { cartItems: updatedItems, totalAmount: totalAmt}
      }),

      addToCart: (item) =>
        set((state) => {
          // check if the item already exists.
          const itemExists = state.cartItems.find(
            (exist) => exist.product_id === item.product_id
          );

          // hold the updated values.
          let updatedItems;

          if (itemExists) {
            updatedItems = state.cartItems.map((i) => {
                i.product_id === item.productPrice ? {...i, quantity: i.quantity + 1, subTotal: (i.quantity + 1) * i.productPrice} : i
            })
            // return {
            //   // if the product item exists, increment it by one

            //   cartItems: state.cartItems.map((cartItem) => {
            //     cartItem.product_id === item.product_id
            //       ? { ...cartItem, quantity: cartItem.quantity + 1, subTotal: (item.quantity + 1) * item.productPrice }
            //       : cartItem;
            //   }),
            // };
          } else {
            return {
              updatedItems: [...state.cartItems, { ...item, quantity: 1, subTotal: item.productPrice}],
            };

          }

          const total = updatedItems.reduce((sum, item) => sum + item.subTotal, 0)
          return { cartItems: updatedItems, totalAmount: total}
        }),

      incrementQuantity: (itemID) =>
        set((state) => {
          const updatedItems = state.cartItems.map((item) =>
            item.product_id === itemID
              ? { ...item, quantity: item.quantity + 1, subTotal: (item.quantity + 1) * item.productPrice }
              : item
          )

          const total = updatedItems.reduce((sum, item) => sum + item.subTotal, 0)
          return { cartItems: updatedItems, totalAmount: total}
        }),

      decrementQuantity: (itemID) => {
        set((state) => {
          const updatedItems = state.cartItems.map((item) =>
            item.product_id === itemID && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1, subTotal: (item.quantity - 1) * item.productPrice}
              : item
          )
          const total = updatedItems.reduce((sum, item) => sum + item.subTotal, 0)
          return { cartItems: updatedItems, totalAmount: total}
        });
      },

      removeFromCart: (itemID) =>
        set((state) => {
          // removeFromCart(removeItem);
          const updatedItems = state.cartItems.filter(
            (item) => item.product_id !== itemID
          )
          const total = updatedItems.reduce((sum, item) => sum + item.subTotal, 0)

          return {cartItems: updatedItems, totalAmount: total}
        }),
    }),

    {
      name: "Foodie-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default createStore;
