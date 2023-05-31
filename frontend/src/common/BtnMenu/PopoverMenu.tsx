import {
  List,
  ListItem,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { classNames } from "../../components/Navbar/navbar.utils";
import { CommonPopoverProps } from "./CommonPopover";

export default function PopoverMenu({
  children,
  menu,
  menuHandler,
  setIsOpen,
}: CommonPopoverProps) {
  const itemListHandler = (e: any, item: any) => {
    if (setIsOpen) setIsOpen(false);

    return item.handler?.() || menuHandler?.(e) || null;
  };
  return (
    <>
      <PopoverHandler>{children}</PopoverHandler>
      <PopoverContent className="z-50 w-min">
        <List className="items-center p-0 min-w-fit">
          {menu.map((item) => (
            <div key={item.name}>
              {!item.href ? (
                <ListItem
                  className="font-semibold mt-2 z-40 w-48 rounded-md  py-1 bg-white hover:bg-gray-100 "
                  key={item.name}
                >
                  <button
                    onClick={(e) => itemListHandler(e, item)}
                    name={item.name}
                    className={classNames(
                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full"
                    )}
                  >
                    {item.name}
                  </button>
                </ListItem>
              ) : (
                <NavLink to={item.href}>
                  <ListItem
                    className="font-semibold mt-2 z-40 w-48 rounded-md  py-1 bg-white hover:bg-gray-100 "
                    key={item.name}
                  >
                    <button
                      onClick={(e) => itemListHandler(e, item)}
                      name={item.name}
                      className={classNames(
                        "block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full"
                      )}
                    >
                      {item.name}
                    </button>
                  </ListItem>
                </NavLink>
              )}
            </div>
          ))}
        </List>
      </PopoverContent>
    </>
  );
}
