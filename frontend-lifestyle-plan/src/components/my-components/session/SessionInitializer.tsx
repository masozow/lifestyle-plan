import { useEffect } from "react";
import { useSessionStore } from "@/store";
import { toast } from "sonner";
export const SessionInitializer = () => {
  const { fetchSession, hasTriedFetching } = useSessionStore();

  useEffect(() => {
    if (!hasTriedFetching) {
      fetchSession().catch((err) => {
        toast.error("Session invalid or expired.");
        console.warn("Session invalid or expired:", err);
      });
    }
  }, [hasTriedFetching, fetchSession]);

  return null;
};
