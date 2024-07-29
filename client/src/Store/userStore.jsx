import { create } from "zustand";

const createStore = create((set) => ({
  user: null,
  setUser: (userData) => {
    set(() => ({ user: userData }));
  },
  
  clearUser: () => {
    set(() => ({ user: null }));
  },
}));

export default createStore;
