import { create } from "zustand";

const initialState = {
  user: null,
};

export const useStateStore = create((set) => ({
  ...initialState,
  setUser: (newUser) => set(() => ({ user: newUser })),
}));
