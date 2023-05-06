import { create } from "zustand";
import { useUser } from "./userStore";
import { CoursesState, UserState } from "./store.interfaces";
import { devtools, persist } from "zustand/middleware";
import { useCourses } from "./coursesStore";

export type StoreState = UserState & CoursesState;

export const useBoundStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...useUser(...a),
        ...useCourses(...a),
      }),
      {
        name: "user",
        partialize: (state) => ({
          currUser: state.currUser,
          isLoggedIn: state.isLoggedIn,
        }),
      }
    )
  )
);
