import { useBoundStore } from "../store/store";
import { useEffect } from "react";
import { useAuth } from "../common/hooks/useAuth";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";

const Dashboard = () => {
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  const { isAuthFn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      isAuthFn();
    }
  }, [isLoggedIn]);

  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <Button>Hello</Button>
      </PopoverHandler>
      <PopoverContent>
        This is a very beautiful popover, show some love.
      </PopoverContent>
    </Popover>
  );
};

export default Dashboard;
