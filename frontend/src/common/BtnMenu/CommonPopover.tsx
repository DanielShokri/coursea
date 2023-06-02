import React, { useState } from "react";
import { Popover } from "@material-tailwind/react";
import PopoverMenu from "./PopoverMenu";

export type MenuItem = {
  [key: string]: any;
};

export type CommonPopoverProps = {
  children: React.ReactNode | string;
  menu: MenuItem[];
  menuHandler?: any;
  name?: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CommonPopover({
  children,
  menu,
  menuHandler,
  name,
}: CommonPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      open={isOpen}
      key={name}
      placement="bottom-start"
      handler={() => setIsOpen(!isOpen)}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <PopoverMenu
        setIsOpen={setIsOpen}
        children={children}
        menu={menu}
        menuHandler={menuHandler}
      />
    </Popover>
  );
}
