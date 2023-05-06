import { useEffect, useRef } from "react";
import { useBoundStore } from "../../store/store";
import { useLazyQuery } from "@apollo/client";
import { VERIFY_USER } from "../../Queries/queries";

interface UseAuthResult {
  isAuthFn: () => void;
}

export const useAuth = (): UseAuthResult => {
  const authIntervalRef = useRef<number>();

  const setCurrUser = useBoundStore((state) => state.setCurrUser);
  const setIsLoggedIn = useBoundStore((state) => state.setIsLoggedIn);
  const logout = useBoundStore((state) => state.logout);

  const [isAuthFn, { data }] = useLazyQuery(VERIFY_USER, {
    variables: {
      token: localStorage.getItem("token"),
    },
    onCompleted({ verifyUser }) {
      setCurrUser?.(verifyUser);
      setIsLoggedIn?.(true);
    },
    onError({ graphQLErrors }) {
      localStorage.removeItem("token");
      logout?.();
    },
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first", // Used for subsequent executions
  });

  useEffect(() => {
    isAuthFn();

    authIntervalRef.current = setInterval(() => {
      isAuthFn();
    }, 3000 * 60);

    return () => clearInterval(authIntervalRef.current);
  }, [isAuthFn]);

  return { isAuthFn };
};
