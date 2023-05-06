import { useBoundStore } from "../store/store";
import { useEffect } from "react";
import { useAuth } from "../common/hooks/useAuth";

const Dashboard = () => {
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  const { isAuthFn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      isAuthFn();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <div className="">dasas</div>
    </div>
  );
};

export default Dashboard;
