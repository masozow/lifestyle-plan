import { useEffect } from "react";
import { useSessionStore } from "@/store";

export const SessionInitializer = () => {
  const fetchSession = useSessionStore((state) => state.fetchSession);
  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return null;
};
