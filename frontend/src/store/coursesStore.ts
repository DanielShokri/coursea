import { StateCreator } from "zustand";
import { CoursesState } from "./store.interfaces";
import { StoreState } from "./store";

export const useCourses: StateCreator<StoreState, [], [], CoursesState> = (
  set
) => ({
  courses: [],
  //  setters
  setCourses: (courses) => set({ courses }),
});
