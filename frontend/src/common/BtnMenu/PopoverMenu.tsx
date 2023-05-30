import { Menu } from "@headlessui/react";
import React from "react";
import { classNames } from "../../components/Navbar/navbar.utils";
import { NavLink } from "react-router-dom";
import {
  PopoverHandler,
  PopoverContent,
  Popover,
} from "@material-tailwind/react";

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

export default function PopoverMenu({
  children,
  menu,
  menuHandler,
  name,
  customOuterClass,
}: BtnMenuProps) {
  return (
    <Popover
      key={name}
      placement="bottom-start"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <PopoverHandler>{children}</PopoverHandler>
      <PopoverContent>
        <Menu>
          <Menu.Items
            className={` font-semibold mt-2 z-40 w-48 rounded-md shadow-xl py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${customOuterClass}`}
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
        </Menu>
      </PopoverContent>
    </Popover>
  );
}
