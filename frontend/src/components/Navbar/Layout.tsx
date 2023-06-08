import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import HeaderTitle from "./HeaderTitle/HeaderTitle";
import { Link, Outlet } from "react-router-dom";
import { RoutePaths } from "../../common/interfaces/commonInterfaces";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { useBoundStore } from "../../store/store";
import ProfileDDMenu from "../../common/BtnMenu/ProfileDDMenu";

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
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
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
                  <ProfileDDMenu />
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
