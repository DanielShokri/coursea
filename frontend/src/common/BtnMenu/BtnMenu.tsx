import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { classNames } from "../../components/Navbar/navbar.utils";
import { NavLink } from "react-router-dom";

export type MenuItem = {
  [key: string]: any;
};

type BtnMenuProps = {
  children: React.ReactNode | string;
  menu: MenuItem[];
  menuHandler?: any;
  name?: string;
  customOuterClass?: string;
};

export default function BtnMenu({
  children,
  menu,
  menuHandler,
  name,
  customOuterClass,
}: BtnMenuProps) {
  return (
    <Menu as="div" className="relative z-50">
      <div>
        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full">
          {children}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`origin-top-right absolute right-0 font-semibold mt-2 w-48 rounded-md shadow-xl py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${customOuterClass}`}
        >
          {menu.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <>
                  {!item.href ? (
                    <button
                      onClick={item?.handler || menuHandler}
                      name={item.name}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full"
                      )}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <NavLink to={item.href}>
                      <button
                        onClick={item?.handler || menuHandler}
                        name={item.name}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full"
                        )}
                      >
                        {item.name}
                      </button>
                    </NavLink>
                  )}
                </>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
