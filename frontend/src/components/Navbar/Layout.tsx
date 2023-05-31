import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  BookOpenIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import HeaderTitle from "./HeaderTitle/HeaderTitle";
import { Link, Outlet } from "react-router-dom";
import { RoutePaths } from "../../common/interfaces/commonInterfaces";
import { classNames, userNavigation } from "./navbar.utils";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { useBoundStore } from "../../store/store";
import CommonPopover from "../../common/BtnMenu/CommonPopover";
import { Avatar, Button } from "@material-tailwind/react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);

  return (
    <>
      <div>
        {/* Mobile nav */}
        <MobileNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Static sidebar for desktop */}
        <DesktopNav />
        {/* Profile icon and content layout */}
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="top-0 z-10 flex-shrink-0 flex h-20 sm:h-36 bg-white justify-between items-center">
            <div className="hidden md:flex w-full">
              <HeaderTitle inputWidth="" />
            </div>
            <button
              type="button"
              className="px-4 text-gray-500  md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="pr-8 pl-4 flex justify-between items-center">
              <div className="">
                {/* <button
                  type="button"
                  className="bg-white p-1 rounded-full hover:text-gray-600 "
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                {!isLoggedIn ? (
                  <Link to={RoutePaths.login} className="ml-3">
                    Login
                  </Link>
                ) : (
                  <CommonPopover menu={userNavigation}>
                    <Avatar
                      size="sm"
                      className="cursor-pointer "
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="avatar"
                    />
                  </CommonPopover>
                )}
              </div>
            </div>
          </div>

          <div className="w-full border-t-2 border-gray-100 shadow-md" />
          <main>
            <div className="">
              <div className="block md:hidden">
                <HeaderTitle />
              </div>
              <div className="max-w-[104rem] mx-auto px-4 sm:px-6 md:px-8">
                {/* Site Content */}
                <div className="py-4">
                  <Outlet />
                </div>
                {/* /End site content */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
