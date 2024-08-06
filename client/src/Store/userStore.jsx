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
      quantity: 0,
      setCart: (items) => set({ cartItems: items }),
      addToCart: (item) =>
        set((state) => {
          // check if the item already exists.
          const itemExists = state.cartItems.find(
            (exist) => exist.product_id === item.product_id
          );
          if (itemExists) {
            return {
              // if the product item exists, increment it by one

              cartItems: state.cartItems.map((cartItem) => {
                cartItem.product_id === item.product_id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem;
              }),
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...item, quantity: 1 }],
            };
          }
        }),

      incrementQuantity: (itemID) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.product_id === itemID
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      decrementQuantity: (itemID) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.product_id === itemID && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },

      removeFromCart: (itemID) =>
        set((state) => ({
          // removeFromCart(removeItem);

          cartItems: state.cartItems.filter(
            (item) => item.product_id !== itemID
          ),
        })),
    }),

    {
      name: "Foodie-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default createStore;
