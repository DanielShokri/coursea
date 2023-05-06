import React from "react";
import { NavLink } from "react-router-dom";
import { classNames, navigation } from "./navbar.utils";

export default function DesktopNav() {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 mb-7">
          <img className="h-14 w-full" src="/logo-black.svg" alt="Workflow" />
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-5 pb-4 space-y-5">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "bg-neutral-grey text-neutral-black"
                      : "text-neutral-darkGrey",
                    "group flex items-center px-4 hover:bg-neutral-grey hover:text-neutral-black py-4 text-sm font-medium rounded-md"
                  )
                }
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-6 w-6 "
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
