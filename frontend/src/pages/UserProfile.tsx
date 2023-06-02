import {
  CogIcon,
  UserCircleIcon,
  BellIcon,
  DesktopComputerIcon,
} from "@heroicons/react/outline";
import CommonButton from "../common/Button/Button";
import EditProfile from "../components/UserProfile/EditProfile";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { RoutePaths } from "../common/interfaces/commonInterfaces";
import { useCallback, useEffect } from "react";
import { useBoundStore } from "../store/store";
import Courses from "../components/UserProfile/Courses";

export default function UserProfile() {
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  const logout = useBoundStore((state) => state.logout);
  const navigate = useNavigate();
  let location = useLocation().pathname;
  const locationArr = location.split("/");
  const locationName = locationArr[locationArr.length - 1];

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout?.();
    navigate(RoutePaths.dashboard);
  };

  useEffect(() => {
    if (!isLoggedIn) navigate(RoutePaths.dashboard);
  }, [isLoggedIn]);

  const profileTabRenderer = useCallback(
    (profileTab: string) => {
      switch (profileTab) {
        case "edit":
          return <EditProfile />;
        case "courses":
          return <Courses />;
        case "setting":
          return <div>Account Setting</div>;
        case "notifications":
          return <div>Notifications</div>;
        default:
          return <div>Default</div>;
      }
    },
    [location]
  );

  return (
    <div className="container flex flex-wrap">
      <div className="w-[350px] p-8 mr-8 shadow-sm rounded-sm">
        <span className="text-neutral-black font-urban-semibold text-2xl">
          Update And Manage Your Account
        </span>
        <div className="mt-4 flex flex-col gap-5 font-urban-medium">
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-neutral-grey  rounded-md" : ""
            }
            to={RoutePaths.editProfile}
          >
            <div className="flex rounded-md p-3 ">
              <UserCircleIcon
                className="h-6 w-6 text-neutral-darkGrey mr-2"
                aria-hidden="true"
              />
              Edit Profile
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-neutral-grey  rounded-md" : ""
            }
            to={RoutePaths.profileCourses}
          >
            <div className="flex rounded-md p-3 ">
              <DesktopComputerIcon
                className="h-6 w-6 text-neutral-darkGrey mr-2"
                aria-hidden="true"
              />
              Manage your courses
            </div>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-neutral-grey  rounded-md" : ""
            }
            to={RoutePaths.profileNotification}
          >
            <div className="flex p-3">
              <BellIcon
                className="h-6 w-6 text-neutral-darkGrey mr-2"
                aria-hidden="true"
              />
              Notifications
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-neutral-grey  rounded-md" : ""
            }
            to={RoutePaths.profileSetting}
          >
            <div className="flex rounded-md p-3 ">
              <CogIcon
                className="h-6 w-6 text-neutral-darkGrey mr-2"
                aria-hidden="true"
              />
              Account Setting
            </div>
          </NavLink>
          <CommonButton
            title="Logout"
            twClassName="border"
            onClick={handleLogout}
          />
        </div>
      </div>
      {profileTabRenderer(locationName)}
    </div>
  );
}
