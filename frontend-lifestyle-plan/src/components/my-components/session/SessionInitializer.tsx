import { useEffect } from "react";
import { useSessionStore } from "@/store";

export const SessionInitializer = () => {
  const { fetchSession, isAuthenticated, hasTriedFetching } = useSessionStore();

  useEffect(() => {
    if (!isAuthenticated && !hasTriedFetching) {
      fetchSession();
    }
  }, [isAuthenticated, hasTriedFetching, fetchSession]);

  return null;
};
