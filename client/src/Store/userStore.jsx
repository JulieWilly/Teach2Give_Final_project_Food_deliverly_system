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
    }),
    {
      name: "Foodie-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default createStore;
