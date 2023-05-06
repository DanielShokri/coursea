import React from "react";
import { Toaster } from "react-hot-toast";
// Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Components
import CurrentScreenSize from "./common/CurrentScreenSize";
import { RoutePaths } from "./common/interfaces/commonInterfaces";
import Layout from "./components/Navbar/Layout";
import { useQuery } from "@apollo/client";
import { VERIFY_USER } from "./Queries/queries";
import { useBoundStore } from "./store/store";
import { useAuth } from "./common/hooks/useAuth";
import UserProfile from "./pages/UserProfile";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const CoursesPage = React.lazy(() => import("./pages/CoursesPage"));
const CoursePage = React.lazy(() => import("./pages/CoursePage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={RoutePaths.login} element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path={RoutePaths.dashboard} element={<Dashboard />} />
        <Route path={RoutePaths.courses} element={<CoursesPage />} />
        <Route path={RoutePaths.course} element={<CoursePage />} />
        <Route path={RoutePaths.profile} element={<UserProfile />}>
          <Route path={RoutePaths.editProfile} />
          <Route path={RoutePaths.profileSetting} />
          <Route path={RoutePaths.profileNotification} />
          <Route path={RoutePaths.profileCourses} />
        </Route>
        <Route path={RoutePaths.mentors} element={<div>Mentors</div>} />
        <Route path={RoutePaths.messages} element={<div>Messages</div>} />
      </Route>
    </>
  )
);

function App() {
  useAuth();

  return (
    <>
      <div>
        <Toaster position="top-right" />
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
