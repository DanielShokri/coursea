import { StateCreator } from "zustand";
import { UserState } from "./store.interfaces";
import { StoreState } from "./store";

export const currUserInitialState = {
  name: "",
  role: "",
  createdAt: null,
  coursesEnrolled: [],
  email: "",
  id: "",
};

export const useUser: StateCreator<
  StoreState,
  [["zustand/persist", unknown]],
  [],
  UserState
> = (set) => ({
  currUser: currUserInitialState,
  isLoggedIn: false,
  //   setters
  setCurrUser: (user) => set({ currUser: user }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),
  // Actions
  logout: () => set({ currUser: currUserInitialState, isLoggedIn: false }),
});
